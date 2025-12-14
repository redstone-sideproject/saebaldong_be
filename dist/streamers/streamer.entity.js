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
exports.Streamer = void 0;
const typeorm_1 = require("typeorm");
const participation_entity_1 = require("../timeline/participation.entity");
const valorant_match_player_entity_1 = require("../valorant-match/entities/valorant-match-player.entity");
let Streamer = class Streamer {
};
exports.Streamer = Streamer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Streamer.prototype, "streamerId", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: false }),
    __metadata("design:type", String)
], Streamer.prototype, "hashId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: false }),
    __metadata("design:type", String)
], Streamer.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'member', length: 20, nullable: false }),
    __metadata("design:type", String)
], Streamer.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: false }),
    __metadata("design:type", String)
], Streamer.prototype, "profileImageUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ nullable: false }),
    __metadata("design:type", Date)
], Streamer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: false }),
    __metadata("design:type", Date)
], Streamer.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => participation_entity_1.Participation, (participation) => participation.streamer),
    __metadata("design:type", Array)
], Streamer.prototype, "participations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => valorant_match_player_entity_1.ValorantMatchPlayerEntity, (valorant_match_player) => valorant_match_player.streamer),
    __metadata("design:type", Array)
], Streamer.prototype, "players", void 0);
exports.Streamer = Streamer = __decorate([
    (0, typeorm_1.Entity)()
], Streamer);
//# sourceMappingURL=streamer.entity.js.map