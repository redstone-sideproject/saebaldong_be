import { ParticipantDto } from '@src/timeline/dtos/create-timeline.dto';
export declare class UpdateTimelineDto {
    title: string;
    description: string;
    date: Date;
    participants: ParticipantDto[];
}
