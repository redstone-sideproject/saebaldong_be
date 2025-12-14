import { Participation } from '@src/timeline/participation.entity';
export declare class Timeline {
    timelineId: number;
    title: string;
    description: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    participations: Participation[];
}
