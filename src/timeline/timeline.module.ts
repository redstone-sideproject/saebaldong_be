import { Module, forwardRef } from '@nestjs/common'
import { TimelineController } from './timeline.controller'
import { TimelineService } from './timeline.service'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Timeline } from './timeline.entity'
import { Participation } from './participation.entity'

import { StreamersModule } from '../streamers/streamers.module'
import { AuthModule } from '../auth/auth.module'
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Timeline, Participation]),
    forwardRef(() => StreamersModule),
  ],
  exports: [TimelineService],
  controllers: [TimelineController],
  providers: [TimelineService],
})
export class TimelineModule {}
