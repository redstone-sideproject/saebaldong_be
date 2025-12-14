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
exports.ValorantMatchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const valorant_match_entitiy_1 = require("./entities/valorant-match.entitiy");
const valorant_match_player_entity_1 = require("./entities/valorant-match-player.entity");
let ValorantMatchService = class ValorantMatchService {
    constructor(valorantMatchRepo, valorantMatchPlayerRepo) {
        this.valorantMatchRepo = valorantMatchRepo;
        this.valorantMatchPlayerRepo = valorantMatchPlayerRepo;
    }
    async getMatchByTimelineId(timelineId) {
        return await this.valorantMatchRepo.findOneBy({ timelineId });
    }
    async getPlayersByMatchId(matchId) {
        const result = await this.valorantMatchPlayerRepo
            .createQueryBuilder('valorant_match_player')
            .leftJoinAndSelect('valorant_match_player.streamer', 'streamer')
            .getMany();
        return result;
    }
    async getValorantMatchByTimelineId(timelineId) {
        const match = await this.valorantMatchRepo
            .createQueryBuilder('valorant_match')
            .leftJoinAndSelect('valorant_match.players', 'valorant_match_player')
            .leftJoinAndSelect('valorant_match_player.streamer', 'streamer')
            .where('valorant_match.timelineId = :timelineId', { timelineId })
            .getMany();
        return match;
    }
    async getValorantMatchByQuery(page = 1, matchType = null) {
        const limit = 10;
        const qb = this.valorantMatchRepo
            .createQueryBuilder('valorant_match')
            .leftJoinAndSelect('valorant_match.players', 'valorant_match_player')
            .leftJoinAndSelect('valorant_match_player.streamer', 'streamer')
            .orderBy('valorant_match.date', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        if (matchType) {
            qb.where('valorant_match.matchType = :matchType', { matchType });
        }
        const [matches, total] = await qb.getManyAndCount();
        return {
            data: matches,
            currentPage: page,
            totalPage: Math.ceil(total / limit),
        };
    }
};
exports.ValorantMatchService = ValorantMatchService;
exports.ValorantMatchService = ValorantMatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(valorant_match_entitiy_1.ValorantMatchEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(valorant_match_player_entity_1.ValorantMatchPlayerEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ValorantMatchService);
//# sourceMappingURL=valorant-match.service.js.map