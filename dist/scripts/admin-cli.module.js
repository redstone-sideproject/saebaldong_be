"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCliModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_1 = require("../config/typeorm.config");
const user_entity_1 = require("../user/entities/user.entity");
const user_service_1 = require("../user/user.service");
let AdminCliModule = class AdminCliModule {
};
exports.AdminCliModule = AdminCliModule;
exports.AdminCliModule = AdminCliModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env.${process.env.NODE_ENV}`,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const env = process.env.NODE_ENV || 'development';
                    return (0, typeorm_config_1.typeOrmConfig)(env, configService);
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
        ],
        providers: [user_service_1.UserService],
    })
], AdminCliModule);
//# sourceMappingURL=admin-cli.module.js.map