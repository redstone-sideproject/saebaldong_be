import { Timeline } from '@src/timeline/timeline.entity';
import { Streamer } from '@src/streamers/streamer.entity';
export declare class Participation {
    participationId: number;
    playHour: number;
    streamer: Streamer;
    timeline: Timeline;
}
