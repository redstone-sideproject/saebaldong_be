import { Repository } from 'typeorm';
import { ValorantMatchEntity } from '@src/valorant-match/entities/valorant-match.entitiy';
import { ValorantMatchPlayerEntity } from '@src/valorant-match/entities/valorant-match-player.entity';
import { MatchTypeUnion } from '@src/valorant-match/types/valorant-match';
export declare class ValorantMatchService {
    private readonly valorantMatchRepo;
    private readonly valorantMatchPlayerRepo;
    constructor(valorantMatchRepo: Repository<ValorantMatchEntity>, valorantMatchPlayerRepo: Repository<ValorantMatchPlayerEntity>);
    getMatchByTimelineId(timelineId: number): Promise<ValorantMatchEntity | null>;
    getPlayersByMatchId(matchId: number): Promise<ValorantMatchPlayerEntity[]>;
    getValorantMatchByTimelineId(timelineId: number): Promise<ValorantMatchEntity[]>;
    getValorantMatchByQuery(page?: number, matchType?: MatchTypeUnion | null): Promise<{
        data: ValorantMatchEntity[];
        currentPage: number;
        totalPage: number;
    }>;
}
