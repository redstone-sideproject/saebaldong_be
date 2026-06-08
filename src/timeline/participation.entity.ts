import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Timeline } from './timeline.entity'
import { Streamer } from '../streamers/streamer.entity'

@Entity()
export class Participation {
  @PrimaryGeneratedColumn()
  participationId: number

  @Column({ type: 'float', default: 0, nullable: false })
  playHour: number

  @ManyToOne(() => Streamer, (streamer) => streamer.participations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'streamerId', referencedColumnName: 'streamerId' })
  streamer: Streamer

  @ManyToOne(() => Timeline, (Timeline) => Timeline.participations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'timelineId', referencedColumnName: 'timelineId' })
  timeline: Timeline
}
