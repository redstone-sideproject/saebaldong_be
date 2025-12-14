"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValorantMatchModule = void 0;
const common_1 = require("@nestjs/common");
const valorant_match_controller_1 = require("./valorant-match.controller");
const valorant_match_service_1 = require("./valorant-match.service");
const typeorm_1 = require("@nestjs/typeorm");
const valorant_match_entitiy_1 = require("./entities/valorant-match.entitiy");
const valorant_match_player_entity_1 = require("./entities/valorant-match-player.entity");
let ValorantMatchModule = class ValorantMatchModule {
};
exports.ValorantMatchModule = ValorantMatchModule;
exports.ValorantMatchModule = ValorantMatchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([valorant_match_entitiy_1.ValorantMatchEntity, valorant_match_player_entity_1.ValorantMatchPlayerEntity]),
        ],
        controllers: [valorant_match_controller_1.ValorantMatchController],
        providers: [valorant_match_service_1.ValorantMatchService],
    })
], ValorantMatchModule);
//# sourceMappingURL=valorant-match.module.js.map