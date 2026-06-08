import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import {
  valorantTierKeys,
  valorantAgentKeys,
  teamTypeKeys,
  TeamTypeUnion,
  ValorantAgentUnion,
  ValorantTierUnion,
} from '../types/valorant-match'

import { Streamer } from '../../streamers/streamer.entity'
import { ValorantMatchEntity } from './valorant-match.entitiy'

@Entity('valorant_match_player')
export class ValorantMatchPlayerEntity {
  @PrimaryGeneratedColumn()
  playerId: number

  @Column({ type: 'integer' })
  matchId: number

  @Column({ type: 'integer', nullable: true })
  streamerId?: number

  @Column({ type: 'enum', enum: Object.values(teamTypeKeys), nullable: false })
  team: TeamTypeUnion

  @Column({
    type: 'enum',
    enum: Object.values(valorantAgentKeys),
    nullable: false,
  })
  agent: ValorantAgentUnion

  @Column({
    type: 'enum',
    enum: Object.values(valorantTierKeys),
    nullable: false,
  })
  tier: ValorantTierUnion

  @Column({ type: 'integer', default: 0 })
  avgCombatScore: number

  @Column({ type: 'integer', default: 0 })
  kills: number

  @Column({ type: 'integer', default: 0 })
  deaths: number

  @Column({ type: 'integer', default: 0 })
  assists: number

  @Column({ type: 'integer', default: 0 })
  efficiencyRating: number

  @Column({ type: 'integer', default: 0 })
  firstKill: number

  @Column({ type: 'integer', default: 0 })
  plant: number

  @Column({ type: 'integer', default: 0 })
  defuse: number

  @ManyToOne(() => Streamer, { nullable: true })
  @JoinColumn({ name: 'streamerId' })
  streamer?: Streamer

  @ManyToOne(() => ValorantMatchEntity, (match) => match.players)
  @JoinColumn({ name: 'matchId' })
  match: ValorantMatchEntity
}
