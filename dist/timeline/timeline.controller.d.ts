import { TimelineService } from '@src/timeline/timeline.service';
import { CreateTimelineDto } from '@src/timeline/dtos/create-timeline.dto';
import { UpdateTimelineDto } from '@src/timeline/dtos/update-timieline.dto';
export declare class TimelineController {
    private readonly timelineService;
    constructor(timelineService: TimelineService);
    getTimelineDate(): Promise<import("./timeline.entity").Timeline[]>;
    getTimelineById(timelineId: number): Promise<import("./timeline.entity").Timeline>;
    getTimelineAll(page?: string): Promise<{
        totalData: number;
        currentPage: number;
        totalPage: number;
        data: import("./timeline.entity").Timeline[];
    }>;
    getTimelineByDate(date: string): Promise<import("./timeline.entity").Timeline[]>;
    createTimeline(body: CreateTimelineDto): Promise<{
        message: string;
        timelineId: number;
    }>;
    updateTimeline(timelineId: number, body: UpdateTimelineDto): Promise<{
        message: string;
    }>;
}
