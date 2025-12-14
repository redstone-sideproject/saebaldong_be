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
exports.TimelineController = void 0;
const common_1 = require("@nestjs/common");
const timeline_service_1 = require("./timeline.service");
const create_timeline_dto_1 = require("./dtos/create-timeline.dto");
const update_timieline_dto_1 = require("./dtos/update-timieline.dto");
const transaction_interceptor_1 = require("../interceptors/transaction.interceptor");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let TimelineController = class TimelineController {
    constructor(timelineService) {
        this.timelineService = timelineService;
    }
    async getTimelineDate() {
        const dates = await this.timelineService.getAllTimelineDates();
        return dates;
    }
    async getTimelineById(timelineId) {
        const timeline = await this.timelineService.getTimelineWithParticipants(timelineId);
        if (!timeline) {
            throw new common_1.NotFoundException(`타임라인 ID ${timelineId}를 찾을 수 없습니다.`);
        }
        return timeline;
    }
    async getTimelineAll(page = '1') {
        const timelines = await this.timelineService.getTimelineList(page);
        return timelines;
    }
    async getTimelineByDate(date) {
        const timelines = await this.timelineService.getTimelineByDate(date);
        return timelines;
    }
    async createTimeline(body) {
        const newTimeline = await this.timelineService.createTimeline(body);
        return {
            message: '타임라인이 성공적으로 생성되었습니다.',
            timelineId: newTimeline.timelineId,
        };
    }
    async updateTimeline(timelineId, body) {
        await this.timelineService.updateTimeline(timelineId, body, body.participants);
        return { message: '타임라인 정보가 업데이트 되었습니다.' };
    }
};
exports.TimelineController = TimelineController;
__decorate([
    (0, common_1.Get)('/date'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimelineController.prototype, "getTimelineDate", null);
__decorate([
    (0, common_1.Get)('/:timelineId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('timelineId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TimelineController.prototype, "getTimelineById", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimelineController.prototype, "getTimelineAll", null);
__decorate([
    (0, common_1.Get)('/date/:date'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimelineController.prototype, "getTimelineByDate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, transaction_interceptor_1.Transactional)(),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_timeline_dto_1.CreateTimelineDto]),
    __metadata("design:returntype", Promise)
], TimelineController.prototype, "createTimeline", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, transaction_interceptor_1.Transactional)(),
    (0, common_1.Patch)('/:timelineId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('timelineId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_timieline_dto_1.UpdateTimelineDto]),
    __metadata("design:returntype", Promise)
], TimelineController.prototype, "updateTimeline", null);
exports.TimelineController = TimelineController = __decorate([
    (0, common_1.Controller)('timeline'),
    __metadata("design:paramtypes", [timeline_service_1.TimelineService])
], TimelineController);
//# sourceMappingURL=timeline.controller.js.map