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
exports.TimelineService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const timeline_entity_1 = require("./timeline.entity");
const participation_entity_1 = require("./participation.entity");
const streamers_service_1 = require("../streamers/streamers.service");
let TimelineService = class TimelineService {
    constructor(timelineRepo, participationRepo, streamersService) {
        this.timelineRepo = timelineRepo;
        this.participationRepo = participationRepo;
        this.streamersService = streamersService;
    }
    async getTimelineById(timelineId) {
        if (!timelineId)
            throw new common_1.BadRequestException('Invalid timelineId');
        return this.timelineRepo.findOneBy({ timelineId }) ?? null;
    }
    async getToTalTimeline() {
        return await this.timelineRepo.count();
    }
    async getTimelineWithParticipants(timelineId) {
        if (!timelineId)
            throw new common_1.BadRequestException('Invalid timelineId');
        const timeline = await this.timelineRepo.findOne({
            where: { timelineId },
            relations: ['participations', 'participations.streamer'],
        });
        if (!timeline)
            throw new common_1.NotFoundException('Timeline not found');
        return timeline;
    }
    async getTimelineList(page = '1', limit = 10) {
        const currentPage = parseInt(page);
        const [timelines, totalData] = await this.timelineRepo.findAndCount({
            skip: (currentPage - 1) * limit,
            take: limit,
            order: { date: 'DESC', timelineId: 'DESC' },
            relations: ['participations', 'participations.streamer'],
        });
        return {
            totalData,
            currentPage,
            totalPage: Math.ceil(totalData / limit),
            data: timelines,
        };
    }
    async getTimelineByDate(date) {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new common_1.BadRequestException('Invalid date format');
        }
        const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));
        const timeline = await this.timelineRepo.find({
            where: { date: (0, typeorm_1.Between)(startOfDay, endOfDay) },
            order: { date: 'DESC' },
            relations: ['participations', 'participations.streamer'],
        });
        return timeline;
    }
    async getAllTimelineDates() {
        return await this.timelineRepo.find({
            select: ['timelineId', 'date'],
            order: { date: 'DESC' },
        });
    }
    async createTimeline(createTimelineDto) {
        try {
            const participants = createTimelineDto.participants;
            await Promise.all(participants.map(async (p) => {
                const streamer = await this.streamersService.findStreamerById(p.streamerId);
                if (!streamer)
                    throw new common_1.NotFoundException(`Streamer ID ${p.streamerId} not found`);
            }));
            const timeline = this.timelineRepo.create(createTimelineDto);
            const savedTimeline = await this.timelineRepo.save(timeline);
            const participations = participants.map((participantDto) => {
                return this.participationRepo.create({
                    streamer: { streamerId: participantDto.streamerId },
                    timeline: { timelineId: savedTimeline.timelineId },
                    playHour: participantDto.playHour,
                });
            });
            await this.participationRepo.save(participations);
            return savedTimeline;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async updateTimeline(timelineId, updateTimeLineDto, participants) {
        try {
            const timeline = await this.getTimelineById(timelineId);
            if (!timeline) {
                throw new common_1.NotFoundException('timeline not found');
            }
            Object.assign(timeline, updateTimeLineDto);
            await this.timelineRepo.save(timeline);
            const existingParticipations = await this.participationRepo.find({
                where: { timeline: { timelineId } },
                relations: ['streamer'],
            });
            const existingMap = new Map(existingParticipations.map((p) => [p.streamer.streamerId, p]));
            const newParticipationEntities = [];
            for (const participant of participants) {
                if (existingMap.has(participant.streamerId)) {
                    const existingParticipation = existingMap.get(participant.streamerId);
                    existingParticipation.playHour = participant.playHour;
                    await this.participationRepo.save(existingParticipation);
                    existingMap.delete(participant.streamerId);
                }
                else {
                    const streamer = await this.streamersService.findStreamerById(participant.streamerId);
                    if (!streamer)
                        throw new common_1.NotFoundException('streamer not found');
                    newParticipationEntities.push(this.participationRepo.create({
                        streamer: { streamerId: streamer.streamerId },
                        timeline: { timelineId },
                        playHour: participant.playHour,
                    }));
                }
            }
            const participationToRemove = Array.from(existingMap.values());
            if (participationToRemove.length > 0) {
                await this.participationRepo.remove(participationToRemove);
            }
            if (newParticipationEntities.length > 0) {
                await this.participationRepo.save(newParticipationEntities);
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
exports.TimelineService = TimelineService;
exports.TimelineService = TimelineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(timeline_entity_1.Timeline)),
    __param(1, (0, typeorm_2.InjectRepository)(participation_entity_1.Participation)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => streamers_service_1.StreamersService))),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        streamers_service_1.StreamersService])
], TimelineService);
//# sourceMappingURL=timeline.service.js.map