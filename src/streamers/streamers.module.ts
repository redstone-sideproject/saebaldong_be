import { Module, forwardRef } from '@nestjs/common'
import { StreamersService } from './streamers.service'
import { StreamersController } from './streamers.controller'

import { TypeOrmModule } from '@nestjs/typeorm'
import { Streamer } from './streamer.entity'
import { Timeline } from '../timeline/timeline.entity'
import { Participation } from '../timeline/participation.entity'
import { TimelineModule } from '../timeline/timeline.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Streamer, Timeline, Participation]),
    forwardRef(() => TimelineModule),
  ],
  exports: [StreamersService],
  providers: [StreamersService],
  controllers: [StreamersController],
})
export class StreamersModule {}
