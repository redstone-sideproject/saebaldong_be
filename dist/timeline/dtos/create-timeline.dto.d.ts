export declare class ParticipantDto {
    streamerId: number;
    playHour: number;
}
export declare class CreateTimelineDto {
    title: string;
    description: string;
    date: Date;
    participants: ParticipantDto[];
}
