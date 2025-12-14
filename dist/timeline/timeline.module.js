"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineModule = void 0;
const common_1 = require("@nestjs/common");
const timeline_controller_1 = require("./timeline.controller");
const timeline_service_1 = require("./timeline.service");
const typeorm_1 = require("@nestjs/typeorm");
const timeline_entity_1 = require("./timeline.entity");
const participation_entity_1 = require("./participation.entity");
const streamers_module_1 = require("../streamers/streamers.module");
const auth_module_1 = require("../auth/auth.module");
let TimelineModule = class TimelineModule {
};
exports.TimelineModule = TimelineModule;
exports.TimelineModule = TimelineModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([timeline_entity_1.Timeline, participation_entity_1.Participation]),
            (0, common_1.forwardRef)(() => streamers_module_1.StreamersModule),
        ],
        exports: [timeline_service_1.TimelineService],
        controllers: [timeline_controller_1.TimelineController],
        providers: [timeline_service_1.TimelineService],
    })
], TimelineModule);
//# sourceMappingURL=timeline.module.js.map