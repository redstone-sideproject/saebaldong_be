"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const streamer_entity_1 = require("./streamer.entity");
const common_2 = require("@nestjs/common");
const timeline_entity_1 = require("../timeline/timeline.entity");
const participation_entity_1 = require("../timeline/participation.entity");
const timeline_service_1 = require("../timeline/timeline.service");
let StreamersService = class StreamersService {
    constructor(repo, timelineRepo, participationRepo, timelineService) {
        this.repo = repo;
        this.timelineRepo = timelineRepo;
        this.participationRepo = participationRepo;
        this.timelineService = timelineService;
    }
    findStreamerById(streamerId) {
        if (!streamerId) {
            return null;
        }
        return this.repo.findOneBy({ streamerId });
    }
    create(body) {
        const streamer = this.repo.create(body);
        return this.repo.save(streamer);
    }
    async update(streamerId, attrs) {
        const streamer = await this.findStreamerById(streamerId);
        if (!streamer) {
            throw new common_2.NotFoundException('streamer not found');
        }
        Object.assign(streamer, attrs);
        return this.repo.save(streamer);
    }
    async remove(streamerId) {
        const streamer = await this.findStreamerById(streamerId);
        if (!streamer) {
            throw new common_2.NotFoundException('streamer not found');
        }
        return this.repo.remove(streamer);
    }
    async getStreamerProfile(streamerId) {
        const streamer = await this.findStreamerById(streamerId);
        if (!streamer)
            throw new common_2.NotFoundException('streamer not found');
        const statsQuery = this.repo
            .createQueryBuilder('streamer')
            .select([
            'streamer.streamerId As "streamerId"',
            'streamer.nickname As "nickname"',
            'streamer.profileImageUrl As "profileImageUrl"',
            'streamer.hashId As "hashId"',
            'streamer.role As "role"',
            'COUNT(DISTINCT participation.timelineId) AS "totalParticipations"',
            'SUM(participation.playHour) AS "totalParticipationTime"',
        ])
            .leftJoin('streamer.participations', 'participation')
            .leftJoin('participation.timeline', 'timeline')
            .where('streamer.streamerId = :streamerId', {
            streamerId,
        })
            .groupBy('streamer.streamerId');
        const streamerStatsResult = await statsQuery.getRawOne();
        if (!streamerStatsResult)
            throw new common_1.InternalServerErrorException();
        const totalGamesData = await this.timelineService.getToTalTimeline();
        const totalGames = totalGamesData ?? 0;
        const timelines = await this.timelineRepo
            .createQueryBuilder('timeline')
            .leftJoinAndSelect('timeline.participations', 'participation')
            .leftJoinAndSelect('participation.streamer', 'streamer')
            .where('timeline.timelineId IN (SELECT "timelineId" FROM participation WHERE "streamerId" = :streamerId)', { streamerId })
            .orderBy('timeline.date', 'DESC')
            .addOrderBy('streamer.streamerId', 'ASC')
            .getMany();
        const timelineDetails = timelines.map((timeline) => ({
            timelineId: timeline.timelineId,
            title: timeline.title,
            description: timeline.description,
            date: timeline.date,
            participants: timeline.participations.map((p) => p.streamer.nickname),
        }));
        const coPlayers = await this.participationRepo
            .createQueryBuilder('participation')
            .select('streamer.nickname', 'nickname')
            .addSelect('COUNT(*)', 'count')
            .innerJoin('participation.timeline', 'timeline')
            .innerJoin('participation.streamer', 'streamer')
            .where('participation.streamerId != :streamerId', { streamerId })
            .andWhere('timeline.timelineId IN (SELECT "timelineId" FROM participation WHERE "streamerId" = :streamerId)', { streamerId })
            .groupBy('streamer.nickname')
            .orderBy('count', 'DESC')
            .getRawMany();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const monthlyParticipation = await this.participationRepo
            .createQueryBuilder('participation')
            .leftJoin('participation.timeline', 'timeline')
            .where('participation.streamerId = :streamerId', { streamerId })
            .andWhere('timeline.date >= :sixMonthsAgo', { sixMonthsAgo })
            .select([
            `TO_CHAR(timeline.date, 'YYYY-MM') AS "yearMonth"`,
            `COUNT(DISTINCT timeline.timelineId) AS count`,
        ])
            .groupBy('"yearMonth"')
            .orderBy('"yearMonth"', 'ASC')
            .getRawMany();
        return {
            ...streamerStatsResult,
            totalParticipations: Number(streamerStatsResult.totalParticipations) || 0,
            totalParticipationTime: Number(streamerStatsResult.totalParticipationTime) || 0,
            participationRatio: totalGames
                ? streamerStatsResult.totalParticipations / totalGames
                : 0,
            timelines: timelineDetails,
            coPlayers,
            monthlyParticipation,
        };
    }
    async getStreamersWithParticipationStats(dto) {
        const { nickname, sortField = 'totalParticipations', sortOrder = 'DESC', } = dto;
        const totalGamesData = await this.timelineService.getToTalTimeline();
        const totalGames = totalGamesData ?? 0;
        const query = this.repo
            .createQueryBuilder('streamer')
            .select([
            'streamer.streamerId As "streamerId"',
            'streamer.nickname As "nickname"',
            'streamer.profileImageUrl As "profileImageUrl"',
            'streamer.hashId As "hashId"',
            'streamer.role As "role"',
            'COUNT(DISTINCT participation.timelineId) AS "totalParticipations"',
            'SUM(participation.playHour) AS "totalParticipationTime"',
        ])
            .leftJoin('streamer.participations', 'participation')
            .leftJoin('participation.timeline', 'timeline')
            .groupBy('streamer.streamerId');
        if (nickname) {
            query.andWhere('streamer.nickname LIKE :nickname', {
                nickname: `%${nickname}%`,
            });
        }
        if (sortField === 'totalParticipationTime') {
            const streamers = await query
                .orderBy(`"${sortField}"`, sortOrder)
                .getRawMany();
            return streamers.map((streamer) => ({
                ...streamer,
                totalParticipations: Number(streamer.totalParticipations) || 0,
                totalParticipationTime: Number(streamer.totalParticipationTime) || 0,
                participationRatio: totalGames
                    ? streamer.totalParticipations / totalGames
                    : 0,
            }));
        }
        const streamers = await query
            .orderBy(`"${sortField}"`, sortOrder)
            .addOrderBy(`"totalParticipationTime"`, 'DESC')
            .getRawMany();
        return streamers.map((streamer) => ({
            ...streamer,
            totalParticipations: Number(streamer.totalParticipations) || 0,
            totalParticipationTime: Number(streamer.totalParticipationTime) || 0,
            participationRatio: totalGames
                ? streamer.totalParticipations / totalGames
                : 0,
        }));
    }
    async getAllStreamer() {
        return await this.repo.find();
    }
};
exports.StreamersService = StreamersService;
exports.StreamersService = StreamersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(streamer_entity_1.Streamer)),
    __param(1, (0, typeorm_2.InjectRepository)(timeline_entity_1.Timeline)),
    __param(2, (0, typeorm_2.InjectRepository)(participation_entity_1.Participation)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => timeline_service_1.TimelineService))),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        timeline_service_1.TimelineService])
], StreamersService);
//# sourceMappingURL=streamers.service.js.map