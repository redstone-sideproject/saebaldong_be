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
exports.ValorantMatchPlayerEntity = void 0;
const typeorm_1 = require("typeorm");
const valorant_match_1 = require("../types/valorant-match");
const streamer_entity_1 = require("../../streamers/streamer.entity");
const valorant_match_entitiy_1 = require("./valorant-match.entitiy");
let ValorantMatchPlayerEntity = class ValorantMatchPlayerEntity {
};
exports.ValorantMatchPlayerEntity = ValorantMatchPlayerEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ValorantMatchPlayerEntity.prototype, "playerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], ValorantMatchPlayerEntity.prototype, "matchId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], ValorantMatchPlayerEntity.prototype, "streamerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Object.values(valorant_match_1.teamTypeKeys), nullable: false }),
    __metadata("design:type", String)
], ValorantMatchPlayerEntity.prototype, "team", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Object.values(valorant_match_1.valorantAgentKeys),
        nullable: false,
    }),
    __metadata("design:type", String)
], ValorantMatchPlayerEntity.prototype, "agent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Object.values(valorant_match_1.valorantTierKeys),
        nullable: false,
    }),
    __metadata("design:type", String)
], ValorantMatchPlayerEntity.prototype, "tier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], ValorantMatchPlayerEntity.prototype, "avgCombatScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], ValorantMatchPlayerEntity.prototype, "kills", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], ValorantMatchPlayerEntity.prototype, "deaths", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], ValorantMatchPlayerEntity.prototype, "assists", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], ValorantMatchPlayerEntity.prototype, "efficiencyRating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], ValorantMatchPlayerEntity.prototype, "firstKill", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], ValorantMatchPlayerEntity.prototype, "plant", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], ValorantMatchPlayerEntity.prototype, "defuse", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => streamer_entity_1.Streamer, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'streamerId' }),
    __metadata("design:type", streamer_entity_1.Streamer)
], ValorantMatchPlayerEntity.prototype, "streamer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => valorant_match_entitiy_1.ValorantMatchEntity, (match) => match.players),
    (0, typeorm_1.JoinColumn)({ name: 'matchId' }),
    __metadata("design:type", valorant_match_entitiy_1.ValorantMatchEntity)
], ValorantMatchPlayerEntity.prototype, "match", void 0);
exports.ValorantMatchPlayerEntity = ValorantMatchPlayerEntity = __decorate([
    (0, typeorm_1.Entity)('valorant_match_player')
], ValorantMatchPlayerEntity);
//# sourceMappingURL=valorant-match-player.entity.js.map