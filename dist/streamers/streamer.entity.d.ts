import { Participation } from '@src/timeline/participation.entity';
import { ValorantMatchPlayerEntity } from '@src/valorant-match/entities/valorant-match-player.entity';
export declare class Streamer {
    streamerId: number;
    hashId: string;
    nickname: string;
    role: string;
    profileImageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    participations: Participation[];
    players: ValorantMatchPlayerEntity[];
}
