import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { Streamer } from './streamer.entity'
import { CreateStreamerDto } from './dtos/create-streamer.dto'

import { NotFoundException } from '@nestjs/common'
import { Timeline } from '../timeline/timeline.entity'
import { Participation } from '../timeline/participation.entity'
import {
  GetStreamersDto,
  StreamerWithStatsDto,
} from './dtos/streamer.dto'

import { TimelineService } from '../timeline/timeline.service'
import { GetStreamerProfileDto } from './dtos/streamer.dto'

@Injectable()
export class StreamersService {
  constructor(
    @InjectRepository(Streamer) private repo: Repository<Streamer>,
    @InjectRepository(Timeline) private timelineRepo: Repository<Timeline>,
    @InjectRepository(Participation)
    private participationRepo: Repository<Participation>,
    @Inject(forwardRef(() => TimelineService))
    private readonly timelineService: TimelineService,
  ) {}

  findStreamerById(streamerId: number) {
    if (!streamerId) {
      return null
    }

    return this.repo.findOneBy({ streamerId })
  }

  create(body: CreateStreamerDto) {
    const streamer = this.repo.create(body)

    return this.repo.save(streamer)
  }

  async update(streamerId: number, attrs: Partial<Streamer>) {
    const streamer = await this.findStreamerById(streamerId)

    if (!streamer) {
      throw new NotFoundException('streamer not found')
    }

    Object.assign(streamer, attrs)

    return this.repo.save(streamer)
  }

  async remove(streamerId: number) {
    const streamer = await this.findStreamerById(streamerId)

    if (!streamer) {
      throw new NotFoundException('streamer not found')
    }

    return this.repo.remove(streamer)
  }

  async getStreamerProfile(streamerId: number) {
    const streamer = await this.findStreamerById(streamerId)
    if (!streamer) throw new NotFoundException('streamer not found')

    const statsQuery = this.repo
      .createQueryBuilder('streamer')
      .select([
        'streamer.streamerId As "streamerId"',
        'streamer.nickname As "nickname"',
        'streamer.profileImageUrl As "profileImageUrl"',
        'streamer.hashId As "hashId"',
        'streamer.role As "role"',
        // 총 게임 참여 횟수
        'COUNT(DISTINCT participation.timelineId) AS "totalParticipations"',
        // 총 참여 시간
        'SUM(participation.playHour) AS "totalParticipationTime"',
      ])
      .leftJoin('streamer.participations', 'participation')
      .leftJoin('participation.timeline', 'timeline')
      .where('streamer.streamerId = :streamerId', {
        streamerId,
      })
      .groupBy('streamer.streamerId')

    const streamerStatsResult: StreamerWithStatsDto | undefined =
      await statsQuery.getRawOne()
    if (!streamerStatsResult) throw new InternalServerErrorException()

    const totalGamesData = await this.timelineService.getToTalTimeline()
    const totalGames = totalGamesData ?? 0

    const timelines = await this.timelineRepo
      .createQueryBuilder('timeline')
      .leftJoinAndSelect('timeline.participations', 'participation')
      .leftJoinAndSelect('participation.streamer', 'streamer')
      .where(
        'timeline.timelineId IN (SELECT "timelineId" FROM participation WHERE "streamerId" = :streamerId)',
        { streamerId },
      )
      .orderBy('timeline.date', 'DESC')
      .addOrderBy('streamer.streamerId', 'ASC')
      .getMany()

    const timelineDetails = timelines.map((timeline) => ({
      timelineId: timeline.timelineId,
      title: timeline.title,
      description: timeline.description,
      date: timeline.date,
      participants: timeline.participations.map((p) => p.streamer.nickname),
    }))

    // 함께 플레이한 스트리머 및 횟수 계산
    const coPlayers = await this.participationRepo
      .createQueryBuilder('participation')
      .select('streamer.nickname', 'nickname')
      .addSelect('COUNT(*)', 'count')
      .innerJoin('participation.timeline', 'timeline')
      .innerJoin('participation.streamer', 'streamer')
      .where('participation.streamerId != :streamerId', { streamerId }) // 자기 자신은 제외
      .andWhere(
        'timeline.timelineId IN (SELECT "timelineId" FROM participation WHERE "streamerId" = :streamerId)',
        { streamerId },
      ) // 같은 타임라인에 참여한 스트리머
      .groupBy('streamer.nickname')
      .orderBy('count', 'DESC')
      .getRawMany()

    // 최근 6개월 기록
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyParticipation = await this.participationRepo
      .createQueryBuilder('participation')
      .leftJoin('participation.timeline', 'timeline')
      .where('participation.streamerId = :streamerId', { streamerId })
      .andWhere('timeline.date >= :sixMonthsAgo', { sixMonthsAgo })
      .select([
        `TO_CHAR(timeline.date, 'YYYY-MM') AS "yearMonth"`,
        `COUNT(DISTINCT timeline.timelineId) AS count`,
      ])
      .groupBy('"yearMonth"')
      .orderBy('"yearMonth"', 'ASC')
      .getRawMany()

    return {
      ...streamerStatsResult,
      totalParticipations: Number(streamerStatsResult.totalParticipations) || 0,
      totalParticipationTime:
        Number(streamerStatsResult.totalParticipationTime) || 0,
      participationRatio: totalGames
        ? streamerStatsResult.totalParticipations / totalGames
        : 0,
      timelines: timelineDetails,
      coPlayers,
      monthlyParticipation,
    }
  }

  async getStreamersWithParticipationStats(
    dto: GetStreamersDto,
  ): Promise<StreamerWithStatsDto[]> {
    const {
      nickname,
      sortField = 'totalParticipations',
      sortOrder = 'DESC',
    } = dto

    const totalGamesData = await this.timelineService.getToTalTimeline()
    const totalGames = totalGamesData ?? 0

    const query = this.repo
      .createQueryBuilder('streamer')
      .select([
        'streamer.streamerId As "streamerId"',
        'streamer.nickname As "nickname"',
        'streamer.profileImageUrl As "profileImageUrl"',
        'streamer.hashId As "hashId"',
        'streamer.role As "role"',
        // 총 게임 참여 횟수
        'COUNT(DISTINCT participation.timelineId) AS "totalParticipations"',
        // 총 참여 시간
        'SUM(participation.playHour) AS "totalParticipationTime"',
      ])
      .leftJoin('streamer.participations', 'participation')
      .leftJoin('participation.timeline', 'timeline')
      .groupBy('streamer.streamerId')

    if (nickname) {
      query.andWhere('streamer.nickname LIKE :nickname', {
        nickname: `%${nickname}%`,
      })
    }

    if (sortField === 'totalParticipationTime') {
      const streamers: StreamerWithStatsDto[] = await query
        .orderBy(`"${sortField}"`, sortOrder)
        .getRawMany()

      // 계산된 비율 및 총 참여 시간 등 리턴
      return streamers.map((streamer) => ({
        ...streamer,
        totalParticipations: Number(streamer.totalParticipations) || 0,
        totalParticipationTime: Number(streamer.totalParticipationTime) || 0,
        participationRatio: totalGames
          ? streamer.totalParticipations / totalGames
          : 0,
      }))
    }
    const streamers: StreamerWithStatsDto[] = await query
      .orderBy(`"${sortField}"`, sortOrder)
      .addOrderBy(`"totalParticipationTime"`, 'DESC')
      .getRawMany()

    // 계산된 비율 및 총 참여 시간 등 리턴
    return streamers.map((streamer) => ({
      ...streamer,
      totalParticipations: Number(streamer.totalParticipations) || 0,
      totalParticipationTime: Number(streamer.totalParticipationTime) || 0,
      participationRatio: totalGames
        ? streamer.totalParticipations / totalGames
        : 0,
    }))
  }

  async getAllStreamer() {
    return await this.repo.find()
  }
}
