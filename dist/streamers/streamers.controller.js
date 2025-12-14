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
exports.StreamersController = void 0;
const common_1 = require("@nestjs/common");
const streamer_dto_1 = require("./dtos/streamer.dto");
const streamers_service_1 = require("./streamers.service");
const create_streamer_dto_1 = require("./dtos/create-streamer.dto");
const update_streamer_dto_1 = require("./dtos/update-streamer.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let StreamersController = class StreamersController {
    constructor(streamersService) {
        this.streamersService = streamersService;
    }
    async createStreamer(body) {
        return await this.streamersService.create(body);
    }
    async updateStreamer(streamerId, body) {
        await this.streamersService.update(streamerId, body);
        return { message: '스트리머 정보가 업데이트되었습니다.' };
    }
    async removeStreamer(streamerId) {
        await this.streamersService.remove(streamerId);
    }
    async getAllStreamer() {
        return await this.streamersService.getAllStreamer();
    }
    async getStreamerProfile(streamerId) {
        return await this.streamersService.getStreamerProfile(streamerId);
    }
    async getStreamersWithParticipationStats(query) {
        return await this.streamersService.getStreamersWithParticipationStats(query);
    }
};
exports.StreamersController = StreamersController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_streamer_dto_1.CreateStreamerDto]),
    __metadata("design:returntype", Promise)
], StreamersController.prototype, "createStreamer", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/:streamerId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('streamerId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_streamer_dto_1.UpdateStreamerDto]),
    __metadata("design:returntype", Promise)
], StreamersController.prototype, "updateStreamer", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/:streamerId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('streamerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StreamersController.prototype, "removeStreamer", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/all'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StreamersController.prototype, "getAllStreamer", null);
__decorate([
    (0, common_1.Get)('/:streamerId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('streamerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StreamersController.prototype, "getStreamerProfile", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [streamer_dto_1.GetStreamersDto]),
    __metadata("design:returntype", Promise)
], StreamersController.prototype, "getStreamersWithParticipationStats", null);
exports.StreamersController = StreamersController = __decorate([
    (0, common_1.Controller)('streamer'),
    __metadata("design:paramtypes", [streamers_service_1.StreamersService])
], StreamersController);
//# sourceMappingURL=streamers.controller.js.map