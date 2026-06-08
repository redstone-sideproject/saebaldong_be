import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm'

import {
  teamTypeKeys,
  matchTypeKeys,
  valorantMapKeys,
  MatchTypeUnion,
  TeamTypeUnion,
  ValorantMapUnion,
} from '../types/valorant-match'
import { ValorantMatchPlayerEntity } from './valorant-match-player.entity'

@Entity('valorant_match')
export class ValorantMatchEntity {
  @PrimaryGeneratedColumn()
  matchId: number

  @Column({ type: 'integer', nullable: true })
  timelineId?: number

  @Column({ type: 'enum', enum: Object.values(matchTypeKeys), nullable: false })
  matchType: MatchTypeUnion

  @Column({ type: 'enum', enum: Object.values(teamTypeKeys), nullable: false })
  winningTeam: TeamTypeUnion

  @Column({
    type: 'enum',
    enum: Object.values(valorantMapKeys),
    nullable: false,
  })
  map: ValorantMapUnion

  @Column({ type: 'integer', default: 0 })
  blueScore: number

  @Column({ type: 'integer', default: 0 })
  redScore: number

  @Column({ nullable: false })
  date: Date

  @Column({ nullable: true, default: null })
  matchDuration?: number

  @CreateDateColumn({ nullable: false })
  createdAt: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date

  @OneToMany(
    () => ValorantMatchPlayerEntity,
    (valorant_match_player) => valorant_match_player.match,
  )
  players: ValorantMatchPlayerEntity[]
}
