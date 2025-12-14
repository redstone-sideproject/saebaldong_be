export declare class StreamerDto {
    streamerId: number;
    nickname: string;
    profileImageUrl: string;
    hashId: string;
    role: string;
}
export declare class StreamerStatsDto {
    totalParticipations: number;
    totalParticipationTime: number;
    participationRatio: number;
}
export declare class StreamerWithStatsDto extends StreamerDto {
    totalParticipations: number;
    totalParticipationTime: number;
    participationRatio: number;
}
export declare class CoPlayersDto {
    nickname: string;
    count: number;
}
export declare class MonthlyParticipationDto {
    yearMonth: string;
    count: number;
}
export declare class GetStreamerProfileDto extends StreamerWithStatsDto {
    timelines: {
        timelineId: number;
        title: string;
        description: string;
        date: string;
    }[];
    coPlayers: CoPlayersDto[];
    monthlyParticipation: MonthlyParticipationDto[];
}
export declare class GetStreamersDto {
    nickname?: string;
    sortField?: 'nickname' | 'totalParticipations' | 'totalParticipationTime' | 'participationRatio';
    sortOrder?: 'ASC' | 'DESC';
}
