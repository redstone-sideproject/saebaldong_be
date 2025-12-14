import { GetStreamersDto } from '@src/streamers/dtos/streamer.dto';
import { StreamersService } from '@src/streamers/streamers.service';
import { CreateStreamerDto } from '@src/streamers/dtos/create-streamer.dto';
import { UpdateStreamerDto } from '@src/streamers/dtos/update-streamer.dto';
export declare class StreamersController {
    private readonly streamersService;
    constructor(streamersService: StreamersService);
    createStreamer(body: CreateStreamerDto): Promise<import("./streamer.entity").Streamer>;
    updateStreamer(streamerId: number, body: UpdateStreamerDto): Promise<{
        message: string;
    }>;
    removeStreamer(streamerId: number): Promise<void>;
    getAllStreamer(): Promise<import("./streamer.entity").Streamer[]>;
    getStreamerProfile(streamerId: number): Promise<{
        totalParticipations: number;
        totalParticipationTime: number;
        participationRatio: number;
        timelines: {
            timelineId: number;
            title: string;
            description: string;
            date: Date;
            participants: string[];
        }[];
        coPlayers: any[];
        monthlyParticipation: any[];
        streamerId: number;
        nickname: string;
        profileImageUrl: string;
        hashId: string;
        role: string;
    }>;
    getStreamersWithParticipationStats(query: GetStreamersDto): Promise<import("@src/streamers/dtos/streamer.dto").StreamerWithStatsDto[]>;
}
