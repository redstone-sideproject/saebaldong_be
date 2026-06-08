import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ValorantMatchEntity } from './entities/valorant-match.entitiy'
import { ValorantMatchPlayerEntity } from './entities/valorant-match-player.entity'

import { MatchTypeUnion } from './types/valorant-match'

@Injectable()
export class ValorantMatchService {
  constructor(
    @InjectRepository(ValorantMatchEntity)
    private readonly valorantMatchRepo: Repository<ValorantMatchEntity>,
    @InjectRepository(ValorantMatchPlayerEntity)
    private readonly valorantMatchPlayerRepo: Repository<ValorantMatchPlayerEntity>,
  ) {}

  async getMatchByTimelineId(timelineId: number) {
    return await this.valorantMatchRepo.findOneBy({ timelineId })
  }

  async getPlayersByMatchId(matchId: number) {
    const result = await this.valorantMatchPlayerRepo
      .createQueryBuilder('valorant_match_player')
      .leftJoinAndSelect('valorant_match_player.streamer', 'streamer')
      .getMany()

    return result
  }

  async getValorantMatchByTimelineId(timelineId: number) {
    const match = await this.valorantMatchRepo
      .createQueryBuilder('valorant_match')
      .leftJoinAndSelect('valorant_match.players', 'valorant_match_player')
      .leftJoinAndSelect('valorant_match_player.streamer', 'streamer')
      .where('valorant_match.timelineId = :timelineId', { timelineId })
      .getMany()

    return match
  }

  async getValorantMatchByQuery(
    page: number = 1,
    matchType: MatchTypeUnion | null = null,
  ) {
    const limit = 10

    const qb = this.valorantMatchRepo
      .createQueryBuilder('valorant_match')
      .leftJoinAndSelect('valorant_match.players', 'valorant_match_player')
      .leftJoinAndSelect('valorant_match_player.streamer', 'streamer')
      .orderBy('valorant_match.date', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)

    if (matchType) {
      qb.where('valorant_match.matchType = :matchType', { matchType })
    }

    const [matches, total] = await qb.getManyAndCount()

    return {
      data: matches,
      currentPage: page,
      totalPage: Math.ceil(total / limit),
    }
  }
}
