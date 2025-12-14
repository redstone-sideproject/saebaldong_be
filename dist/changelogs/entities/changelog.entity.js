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
exports.ChangelogEntity = void 0;
const typeorm_1 = require("typeorm");
let ChangelogEntity = class ChangelogEntity {
};
exports.ChangelogEntity = ChangelogEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChangelogEntity.prototype, "changelogId", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: ['ADD', 'FIX'], nullable: false }),
    __metadata("design:type", String)
], ChangelogEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: false }),
    __metadata("design:type", String)
], ChangelogEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Date)
], ChangelogEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ nullable: false }),
    __metadata("design:type", Date)
], ChangelogEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: false }),
    __metadata("design:type", Date)
], ChangelogEntity.prototype, "updatedAt", void 0);
exports.ChangelogEntity = ChangelogEntity = __decorate([
    (0, typeorm_1.Entity)('changelog')
], ChangelogEntity);
//# sourceMappingURL=changelog.entity.js.map