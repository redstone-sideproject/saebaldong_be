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
} from '@nestjs/common'
import { TimelineService } from '@src/timeline/timeline.service'

import { CreateTimelineDto } from '@src/timeline/dtos/create-timeline.dto'
import { UpdateTimelineDto } from '@src/timeline/dtos/update-timieline.dto'

import { Transactional } from '@src/interceptors/transaction.interceptor'

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  // 타임라인 전체 조회(페이지네이션)
  @Get()
  getTimelineAll() {}

  // 타임라인 단일 조회()
  @Get('/:timelineId')
  getTimelineById(@Param('timelineId') timelineId: number) {
    return this.timelineService.getTimelineWithParticipants(timelineId)
  }

  // 타임라인 생성
  @Transactional()
  @Post()
  async createTimeline(@Body() body: CreateTimelineDto) {
    await this.timelineService.createTimeline(body)
  }

  // 타임라인 수정
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

  // 타임라인 날짜 전체 조회(달력에 사용할)
  @Get()
  getTimelineByDate() {}
}
