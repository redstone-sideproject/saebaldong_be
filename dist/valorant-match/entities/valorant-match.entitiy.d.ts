import { MatchTypeUnion, TeamTypeUnion, ValorantMapUnion } from '@src/valorant-match/types/valorant-match';
import { ValorantMatchPlayerEntity } from '@src/valorant-match/entities/valorant-match-player.entity';
export declare class ValorantMatchEntity {
    matchId: number;
    timelineId?: number;
    matchType: MatchTypeUnion;
    winningTeam: TeamTypeUnion;
    map: ValorantMapUnion;
    blueScore: number;
    redScore: number;
    date: Date;
    matchDuration?: number;
    createdAt: Date;
    updatedAt: Date;
    players: ValorantMatchPlayerEntity[];
}
