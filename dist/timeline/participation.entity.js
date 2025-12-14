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
exports.Participation = void 0;
const typeorm_1 = require("typeorm");
const timeline_entity_1 = require("./timeline.entity");
const streamer_entity_1 = require("../streamers/streamer.entity");
let Participation = class Participation {
};
exports.Participation = Participation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Participation.prototype, "participationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0, nullable: false }),
    __metadata("design:type", Number)
], Participation.prototype, "playHour", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => streamer_entity_1.Streamer, (streamer) => streamer.participations, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'streamerId', referencedColumnName: 'streamerId' }),
    __metadata("design:type", streamer_entity_1.Streamer)
], Participation.prototype, "streamer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => timeline_entity_1.Timeline, (Timeline) => Timeline.participations, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'timelineId', referencedColumnName: 'timelineId' }),
    __metadata("design:type", timeline_entity_1.Timeline)
], Participation.prototype, "timeline", void 0);
exports.Participation = Participation = __decorate([
    (0, typeorm_1.Entity)()
], Participation);
//# sourceMappingURL=participation.entity.js.map