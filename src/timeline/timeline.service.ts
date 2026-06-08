import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common'
import { Between, Repository } from 'typeorm'

import { InjectRepository } from '@nestjs/typeorm'

import { Timeline } from './timeline.entity'

import {
  CreateTimelineDto,
  ParticipantDto,
} from './dtos/create-timeline.dto'
import { Participation } from './participation.entity'
import { StreamersService } from '../streamers/streamers.service'

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(Timeline) private timelineRepo: Repository<Timeline>,
    @InjectRepository(Participation)
    private participationRepo: Repository<Participation>,
    @Inject(forwardRef(() => StreamersService))
    private streamersService: StreamersService,
  ) {}

  async getTimelineById(timelineId: number) {
    if (!timelineId) throw new BadRequestException('Invalid timelineId')

    return this.timelineRepo.findOneBy({ timelineId }) ?? null
  }

  async getToTalTimeline(): Promise<number> {
    return await this.timelineRepo.count()
  }

  async getTimelineWithParticipants(timelineId: number) {
    if (!timelineId) throw new BadRequestException('Invalid timelineId')

    const timeline = await this.timelineRepo.findOne({
      where: { timelineId },
      relations: ['participations', 'participations.streamer'],
    })

    if (!timeline) throw new NotFoundException('Timeline not found')

    return timeline
  }

  async getTimelineList(page: string = '1', limit: number = 10) {
    const currentPage = parseInt(page)
    const [timelines, totalData] = await this.timelineRepo.findAndCount({
      skip: (currentPage - 1) * limit,
      take: limit,
      order: { date: 'DESC', timelineId: 'DESC' },
      relations: ['participations', 'participations.streamer'],
    })

    return {
      totalData,
      currentPage,
      totalPage: Math.ceil(totalData / limit),
      data: timelines,
    }
  }

  async getTimelineByDate(date: string) {
    const parsedDate = new Date(date)

    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date format')
    }

    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0))
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999))

    const timeline = await this.timelineRepo.find({
      where: { date: Between(startOfDay, endOfDay) },
      order: { date: 'DESC' },
      relations: ['participations', 'participations.streamer'],
    })
    return timeline
  }

  async getAllTimelineDates() {
    return await this.timelineRepo.find({
      select: ['timelineId', 'date'],
      order: { date: 'DESC' },
    })
  }

  async createTimeline(createTimelineDto: CreateTimelineDto) {
    try {
      const participants = createTimelineDto.participants

      // 스트리머 존재 확인
      await Promise.all(
        participants.map(async (p) => {
          const streamer = await this.streamersService.findStreamerById(
            p.streamerId,
          )
          if (!streamer)
            throw new NotFoundException(`Streamer ID ${p.streamerId} not found`)
        }),
      )

      // 타임라인 생성
      const timeline = this.timelineRepo.create(createTimelineDto)
      const savedTimeline = await this.timelineRepo.save(timeline)

      // 스트리머 추가
      const participations = participants.map((participantDto) => {
        return this.participationRepo.create({
          streamer: { streamerId: participantDto.streamerId },
          timeline: { timelineId: savedTimeline.timelineId },
          playHour: participantDto.playHour,
        })
      })

      // 저장
      await this.participationRepo.save(participations)

      return savedTimeline
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async updateTimeline(
    timelineId: number,
    updateTimeLineDto: Partial<Timeline>,
    participants: ParticipantDto[],
  ) {
    try {
      const timeline = await this.getTimelineById(timelineId)

      if (!timeline) {
        throw new NotFoundException('timeline not found')
      }

      // 타임라인 업데이트
      Object.assign(timeline, updateTimeLineDto)
      await this.timelineRepo.save(timeline)

      const existingParticipations = await this.participationRepo.find({
        where: { timeline: { timelineId } },
        relations: ['streamer'],
      })

      const existingMap = new Map(
        existingParticipations.map((p) => [p.streamer.streamerId, p]),
      )

      const newParticipationEntities: Participation[] = []

      for (const participant of participants) {
        // 기존 스트리머 업데이트
        if (existingMap.has(participant.streamerId)) {
          const existingParticipation = existingMap.get(participant.streamerId)!
          existingParticipation.playHour = participant.playHour
          await this.participationRepo.save(existingParticipation)
          existingMap.delete(participant.streamerId)
        } else {
          // 새로운 스트리머 추가
          const streamer = await this.streamersService.findStreamerById(
            participant.streamerId,
          )

          if (!streamer) throw new NotFoundException('streamer not found')

          newParticipationEntities.push(
            this.participationRepo.create({
              streamer: { streamerId: streamer.streamerId },
              timeline: { timelineId },
              playHour: participant.playHour,
            }),
          )
        }
      }

      // 제거할 스트리머 배열화
      const participationToRemove = Array.from(existingMap.values())

      // 스트리머 삭제
      if (participationToRemove.length > 0) {
        await this.participationRepo.remove(participationToRemove)
      }

      // 스트리머 추가
      if (newParticipationEntities.length > 0) {
        await this.participationRepo.save(newParticipationEntities)
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
