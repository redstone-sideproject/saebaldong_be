import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common'
import { GetStreamersDto } from './dtos/streamer.dto'
import { StreamersService } from './streamers.service'
import { CreateStreamerDto } from './dtos/create-streamer.dto'
import { UpdateStreamerDto } from './dtos/update-streamer.dto'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('streamer')
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createStreamer(@Body() body: CreateStreamerDto) {
    return await this.streamersService.create(body)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:streamerId')
  @HttpCode(HttpStatus.OK)
  async updateStreamer(
    @Param('streamerId') streamerId: number,
    @Body() body: UpdateStreamerDto,
  ) {
    await this.streamersService.update(streamerId, body)
    return { message: '스트리머 정보가 업데이트되었습니다.' }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:streamerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeStreamer(@Param('streamerId') streamerId: number) {
    await this.streamersService.remove(streamerId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async getAllStreamer() {
    return await this.streamersService.getAllStreamer()
  }

  @Get('/:streamerId')
  @HttpCode(HttpStatus.OK)
  async getStreamerProfile(@Param('streamerId') streamerId: number) {
    return await this.streamersService.getStreamerProfile(streamerId)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getStreamersWithParticipationStats(@Query() query: GetStreamersDto) {
    return await this.streamersService.getStreamersWithParticipationStats(query)
  }
}
