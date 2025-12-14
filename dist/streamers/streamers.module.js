"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamersModule = void 0;
const common_1 = require("@nestjs/common");
const streamers_service_1 = require("./streamers.service");
const streamers_controller_1 = require("./streamers.controller");
const typeorm_1 = require("@nestjs/typeorm");
const streamer_entity_1 = require("./streamer.entity");
const timeline_entity_1 = require("../timeline/timeline.entity");
const participation_entity_1 = require("../timeline/participation.entity");
const timeline_module_1 = require("../timeline/timeline.module");
let StreamersModule = class StreamersModule {
};
exports.StreamersModule = StreamersModule;
exports.StreamersModule = StreamersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([streamer_entity_1.Streamer, timeline_entity_1.Timeline, participation_entity_1.Participation]),
            (0, common_1.forwardRef)(() => timeline_module_1.TimelineModule),
        ],
        exports: [streamers_service_1.StreamersService],
        providers: [streamers_service_1.StreamersService],
        controllers: [streamers_controller_1.StreamersController],
    })
], StreamersModule);
//# sourceMappingURL=streamers.module.js.map