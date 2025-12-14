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
exports.ValorantMatchController = void 0;
const common_1 = require("@nestjs/common");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const valorant_match_service_1 = require("./valorant-match.service");
const valorant_match_dto_1 = require("./dtos/valorant-match.dto");
let ValorantMatchController = class ValorantMatchController {
    constructor(valorantMatchService) {
        this.valorantMatchService = valorantMatchService;
    }
    async getValorantMatchByTimelineId(timelineId) {
        const result = await this.valorantMatchService.getValorantMatchByTimelineId(parseInt(timelineId));
        return result;
    }
    async getValorantMatchByQuery(page = '1', matchType = null) {
        const result = await this.valorantMatchService.getValorantMatchByQuery(parseInt(page), matchType);
        return result;
    }
};
exports.ValorantMatchController = ValorantMatchController;
__decorate([
    (0, common_1.Get)('timeline/:timelineId'),
    (0, serialize_interceptor_1.Serialize)(valorant_match_dto_1.ValorantMatchDetailDto),
    __param(0, (0, common_1.Param)('timelineId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ValorantMatchController.prototype, "getValorantMatchByTimelineId", null);
__decorate([
    (0, common_1.Get)('record'),
    (0, serialize_interceptor_1.Serialize)(valorant_match_dto_1.ValorantMatchPageDto),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('matchType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ValorantMatchController.prototype, "getValorantMatchByQuery", null);
exports.ValorantMatchController = ValorantMatchController = __decorate([
    (0, common_1.Controller)('valorant-match'),
    __metadata("design:paramtypes", [valorant_match_service_1.ValorantMatchService])
], ValorantMatchController);
//# sourceMappingURL=valorant-match.controller.js.map