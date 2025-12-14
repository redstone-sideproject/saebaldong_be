import { Repository } from 'typeorm';
import { Streamer } from '@src/streamers/streamer.entity';
import { CreateStreamerDto } from '@src/streamers/dtos/create-streamer.dto';
import { Timeline } from '@src/timeline/timeline.entity';
import { Participation } from '@src/timeline/participation.entity';
import { GetStreamersDto, StreamerWithStatsDto } from '@src/streamers/dtos/streamer.dto';
import { TimelineService } from '@src/timeline/timeline.service';
export declare class StreamersService {
    private repo;
    private timelineRepo;
    private participationRepo;
    private readonly timelineService;
    constructor(repo: Repository<Streamer>, timelineRepo: Repository<Timeline>, participationRepo: Repository<Participation>, timelineService: TimelineService);
    findStreamerById(streamerId: number): Promise<Streamer | null> | null;
    create(body: CreateStreamerDto): Promise<Streamer>;
    update(streamerId: number, attrs: Partial<Streamer>): Promise<Streamer>;
    remove(streamerId: number): Promise<Streamer>;
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
    getStreamersWithParticipationStats(dto: GetStreamersDto): Promise<StreamerWithStatsDto[]>;
    getAllStreamer(): Promise<Streamer[]>;
}
