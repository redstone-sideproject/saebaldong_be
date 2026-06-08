import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common'
import { TimelineService } from './timeline.service'

import { CreateTimelineDto } from './dtos/create-timeline.dto'
import { UpdateTimelineDto } from './dtos/update-timieline.dto'

import { Transactional } from '../interceptors/transaction.interceptor'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  // 타임라인 날짜 전체 조회(달력에 사용할)
  @Get('/date')
  @HttpCode(HttpStatus.OK)
  async getTimelineDate() {
    const dates = await this.timelineService.getAllTimelineDates()
    return dates
  }

  // 타임라인 단일 조회()
  @Get('/:timelineId')
  @HttpCode(HttpStatus.OK)
  async getTimelineById(@Param('timelineId') timelineId: number) {
    const timeline =
      await this.timelineService.getTimelineWithParticipants(timelineId)
    if (!timeline) {
      throw new NotFoundException(
        `타임라인 ID ${timelineId}를 찾을 수 없습니다.`,
      )
    }
    return timeline
  }

  // 타임라인 전체 조회(페이지네이션)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getTimelineAll(@Query('page') page: string = '1') {
    const timelines = await this.timelineService.getTimelineList(page)
    return timelines
  }

  @Get('/date/:date')
  @HttpCode(HttpStatus.OK)
  async getTimelineByDate(@Param('date') date: string) {
    const timelines = await this.timelineService.getTimelineByDate(date)
    return timelines
  }

  // 타임라인 생성
  @UseGuards(JwtAuthGuard)
  @Transactional()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTimeline(@Body() body: CreateTimelineDto) {
    const newTimeline = await this.timelineService.createTimeline(body)
    return {
      message: '타임라인이 성공적으로 생성되었습니다.',
      timelineId: newTimeline.timelineId,
    }
  }

  // 타임라인 수정
  @UseGuards(JwtAuthGuard)
  @Transactional()
  @Patch('/:timelineId')
  @HttpCode(HttpStatus.OK)
  async updateTimeline(
    @Param('timelineId') timelineId: number,
    @Body() body: UpdateTimelineDto,
  ) {
    await this.timelineService.updateTimeline(
      timelineId,
      body,
      body.participants,
    )
    return { message: '타임라인 정보가 업데이트 되었습니다.' }
  }
}
