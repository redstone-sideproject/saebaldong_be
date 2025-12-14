interface StreamerWithStats {
    streamerId: number;
    nickname: string;
    profileImageUrl: string;
    hashId: string;
    role: string;
    totalParticipations: number;
    totalParticipationTime: number;
    totalGames: number;
    participationRatio: number;
}
export type { StreamerWithStats };
