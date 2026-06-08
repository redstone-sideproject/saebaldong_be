import { Expose, Exclude, Type } from 'class-transformer'
import {
  ValorantAgentUnion,
  ValorantMapUnion,
  ValorantTierUnion,
  TeamTypeUnion,
  MatchTypeUnion,
} from '../types/valorant-match'

class ValorantMatchStreamerDto {
  @Expose()
  streamerId?: number
  @Expose()
  nickname?: string
  @Expose()
  profileImageUrl?: string
}

class ValorantMatchPlayerDto {
  @Exclude()
  playerId: number
  @Expose()
  matchId: number
  @Expose()
  streamerId?: number
  @Expose()
  team: TeamTypeUnion
  @Expose()
  agent: ValorantAgentUnion
  @Expose()
  tier: ValorantTierUnion
  @Expose()
  avgCombatScore: number
  @Expose()
  kills: number
  @Expose()
  deaths: number
  @Expose()
  assists: number
  @Expose()
  efficiencyRating: number
  @Expose()
  firstKill: number
  @Expose()
  plant: number
  @Expose()
  defuse: number

  @Expose()
  @Type(() => ValorantMatchStreamerDto)
  streamer?: ValorantMatchStreamerDto
}

export class ValorantMatchDetailDto {
  @Expose()
  matchId: number

  @Expose()
  timelineId?: number

  @Expose()
  matchType: MatchTypeUnion

  @Expose()
  winningTeam: TeamTypeUnion

  @Expose()
  map: ValorantMapUnion

  @Expose()
  blueScore: number

  @Expose()
  redScore: number

  @Expose()
  date: Date

  @Expose()
  matchDuration?: number

  @Expose()
  @Type(() => ValorantMatchPlayerDto)
  players: ValorantMatchPlayerDto
}

export class ValorantMatchPageDto {
  @Expose()
  currentPage: number

  @Expose()
  totalPage: number

  @Expose()
  @Type(() => ValorantMatchDetailDto)
  data: ValorantMatchDetailDto
}
