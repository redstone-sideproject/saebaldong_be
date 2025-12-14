import { Repository } from 'typeorm';
import { Timeline } from '@src/timeline/timeline.entity';
import { CreateTimelineDto, ParticipantDto } from '@src/timeline/dtos/create-timeline.dto';
import { Participation } from '@src/timeline/participation.entity';
import { StreamersService } from '@src/streamers/streamers.service';
export declare class TimelineService {
    private timelineRepo;
    private participationRepo;
    private streamersService;
    constructor(timelineRepo: Repository<Timeline>, participationRepo: Repository<Participation>, streamersService: StreamersService);
    getTimelineById(timelineId: number): Promise<Timeline | null>;
    getToTalTimeline(): Promise<number>;
    getTimelineWithParticipants(timelineId: number): Promise<Timeline>;
    getTimelineList(page?: string, limit?: number): Promise<{
        totalData: number;
        currentPage: number;
        totalPage: number;
        data: Timeline[];
    }>;
    getTimelineByDate(date: string): Promise<Timeline[]>;
    getAllTimelineDates(): Promise<Timeline[]>;
    createTimeline(createTimelineDto: CreateTimelineDto): Promise<Timeline>;
    updateTimeline(timelineId: number, updateTimeLineDto: Partial<Timeline>, participants: ParticipantDto[]): Promise<void>;
}
