import { ValorantAgentUnion, ValorantMapUnion, ValorantTierUnion, TeamTypeUnion, MatchTypeUnion } from '@src/valorant-match/types/valorant-match';
declare class ValorantMatchStreamerDto {
    streamerId?: number;
    nickname?: string;
    profileImageUrl?: string;
}
declare class ValorantMatchPlayerDto {
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
    streamer?: ValorantMatchStreamerDto;
}
export declare class ValorantMatchDetailDto {
    matchId: number;
    timelineId?: number;
    matchType: MatchTypeUnion;
    winningTeam: TeamTypeUnion;
    map: ValorantMapUnion;
    blueScore: number;
    redScore: number;
    date: Date;
    matchDuration?: number;
    players: ValorantMatchPlayerDto;
}
export declare class ValorantMatchPageDto {
    currentPage: number;
    totalPage: number;
    data: ValorantMatchDetailDto;
}
export {};
