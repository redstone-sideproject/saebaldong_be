import { TeamTypeUnion, ValorantAgentUnion, ValorantTierUnion } from '@src/valorant-match/types/valorant-match';
import { Streamer } from '@src/streamers/streamer.entity';
import { ValorantMatchEntity } from '@src/valorant-match/entities/valorant-match.entitiy';
export declare class ValorantMatchPlayerEntity {
    playerId: number;
    matchId: number;
    streamerId?: number;
    team: TeamTypeUnion;
    agent: ValorantAgentUnion;
    tier: ValorantTierUnion;
    avgCombatScore: number;
    kills: number;
    deaths: number;
    assists: number;
    efficiencyRating: number;
    firstKill: number;
    plant: number;
    defuse: number;
    streamer?: Streamer;
    match: ValorantMatchEntity;
}
