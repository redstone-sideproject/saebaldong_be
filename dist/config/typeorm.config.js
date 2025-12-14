"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const streamer_entity_1 = require("../streamers/streamer.entity");
const timeline_entity_1 = require("../timeline/timeline.entity");
const participation_entity_1 = require("../timeline/participation.entity");
const changelog_entity_1 = require("../changelogs/entities/changelog.entity");
const user_entity_1 = require("../user/entities/user.entity");
const valorant_match_entitiy_1 = require("../valorant-match/entities/valorant-match.entitiy");
const valorant_match_player_entity_1 = require("../valorant-match/entities/valorant-match-player.entity");
const typeOrmConfig = (env, configService) => {
    switch (env) {
        case 'production':
            return {
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                entities: [
                    streamer_entity_1.Streamer,
                    timeline_entity_1.Timeline,
                    participation_entity_1.Participation,
                    changelog_entity_1.ChangelogEntity,
                    valorant_match_entitiy_1.ValorantMatchEntity,
                    valorant_match_player_entity_1.ValorantMatchPlayerEntity,
                    user_entity_1.UserEntity,
                ],
                migrations: ['dist/migrations/*.js'],
                synchronize: false,
                logging: true,
                useUTC: true,
            };
        case 'development':
        default:
            return {
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                entities: [
                    streamer_entity_1.Streamer,
                    timeline_entity_1.Timeline,
                    participation_entity_1.Participation,
                    changelog_entity_1.ChangelogEntity,
                    valorant_match_entitiy_1.ValorantMatchEntity,
                    valorant_match_player_entity_1.ValorantMatchPlayerEntity,
                    user_entity_1.UserEntity,
                ],
                migrations: ['dist/migrations/*.js'],
                synchronize: false,
                logging: true,
                useUTC: true,
            };
    }
};
exports.typeOrmConfig = typeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map