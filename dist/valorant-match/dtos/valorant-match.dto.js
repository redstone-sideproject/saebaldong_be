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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValorantMatchPageDto = exports.ValorantMatchDetailDto = void 0;
const class_transformer_1 = require("class-transformer");
class ValorantMatchStreamerDto {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchStreamerDto.prototype, "streamerId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ValorantMatchStreamerDto.prototype, "nickname", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ValorantMatchStreamerDto.prototype, "profileImageUrl", void 0);
class ValorantMatchPlayerDto {
}
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], ValorantMatchPlayerDto.prototype, "playerId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchPlayerDto.prototype, "matchId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchPlayerDto.prototype, "streamerId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ValorantMatchPlayerDto.prototype, "team", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ValorantMatchPlayerDto.prototype, "agent", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ValorantMatchPlayerDto.prototype, "tier", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchPlayerDto.prototype, "avgCombatScore", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchPlayerDto.prototype, "kills", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchPlayerDto.prototype, "deaths", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchPlayerDto.prototype, "assists", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchPlayerDto.prototype, "efficiencyRating", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchPlayerDto.prototype, "firstKill", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchPlayerDto.prototype, "plant", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchPlayerDto.prototype, "defuse", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ValorantMatchStreamerDto),
    __metadata("design:type", ValorantMatchStreamerDto)
], ValorantMatchPlayerDto.prototype, "streamer", void 0);
class ValorantMatchDetailDto {
}
exports.ValorantMatchDetailDto = ValorantMatchDetailDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchDetailDto.prototype, "matchId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchDetailDto.prototype, "timelineId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ValorantMatchDetailDto.prototype, "matchType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ValorantMatchDetailDto.prototype, "winningTeam", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ValorantMatchDetailDto.prototype, "map", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchDetailDto.prototype, "blueScore", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchDetailDto.prototype, "redScore", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], ValorantMatchDetailDto.prototype, "date", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchDetailDto.prototype, "matchDuration", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ValorantMatchPlayerDto),
    __metadata("design:type", ValorantMatchPlayerDto)
], ValorantMatchDetailDto.prototype, "players", void 0);
class ValorantMatchPageDto {
}
exports.ValorantMatchPageDto = ValorantMatchPageDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchPageDto.prototype, "currentPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ValorantMatchPageDto.prototype, "totalPage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ValorantMatchDetailDto),
    __metadata("design:type", ValorantMatchDetailDto)
], ValorantMatchPageDto.prototype, "data", void 0);
//# sourceMappingURL=valorant-match.dto.js.map