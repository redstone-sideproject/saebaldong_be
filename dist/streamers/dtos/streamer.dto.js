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
exports.GetStreamersDto = exports.GetStreamerProfileDto = exports.MonthlyParticipationDto = exports.CoPlayersDto = exports.StreamerWithStatsDto = exports.StreamerStatsDto = exports.StreamerDto = void 0;
const class_validator_1 = require("class-validator");
class StreamerDto {
}
exports.StreamerDto = StreamerDto;
class StreamerStatsDto {
}
exports.StreamerStatsDto = StreamerStatsDto;
class StreamerWithStatsDto extends StreamerDto {
}
exports.StreamerWithStatsDto = StreamerWithStatsDto;
class CoPlayersDto {
}
exports.CoPlayersDto = CoPlayersDto;
class MonthlyParticipationDto {
}
exports.MonthlyParticipationDto = MonthlyParticipationDto;
class GetStreamerProfileDto extends StreamerWithStatsDto {
}
exports.GetStreamerProfileDto = GetStreamerProfileDto;
class GetStreamersDto {
}
exports.GetStreamersDto = GetStreamersDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetStreamersDto.prototype, "nickname", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)([
        'nickname',
        'totalParticipations',
        'totalParticipationTime',
        'participationRatio',
    ]),
    __metadata("design:type", String)
], GetStreamersDto.prototype, "sortField", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['ASC', 'DESC']),
    __metadata("design:type", String)
], GetStreamersDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=streamer.dto.js.map