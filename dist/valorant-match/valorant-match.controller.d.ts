import { ValorantMatchService } from '@src/valorant-match/valorant-match.service';
export declare class ValorantMatchController {
    private readonly valorantMatchService;
    constructor(valorantMatchService: ValorantMatchService);
    getValorantMatchByTimelineId(timelineId: string): Promise<import("./entities/valorant-match.entitiy").ValorantMatchEntity[]>;
    getValorantMatchByQuery(page?: string, matchType?: null): Promise<{
        data: import("./entities/valorant-match.entitiy").ValorantMatchEntity[];
        currentPage: number;
        totalPage: number;
    }>;
}
