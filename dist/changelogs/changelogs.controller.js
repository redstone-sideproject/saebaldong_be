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
exports.ChangelogsController = void 0;
const common_1 = require("@nestjs/common");
const changelogs_service_1 = require("./changelogs.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_changelog_dto_1 = require("./dtos/create-changelog.dto");
const update_changelog_dto_1 = require("./dtos/update-changelog.dto");
let ChangelogsController = class ChangelogsController {
    constructor(changelogsService) {
        this.changelogsService = changelogsService;
    }
    async getRecentChangelog() {
        return this.changelogsService.getRecentChangelog();
    }
    async getAllChangelog() {
        return this.changelogsService.getAllChangelog();
    }
    async createChangelog(createChangelogDto) {
        return await this.changelogsService.createChagelog(createChangelogDto);
    }
    async getAllchangelogForAdmin() {
        return await this.changelogsService.getAllChangelogForAdmin();
    }
    async getchangelogForAdmin(changelogId) {
        return await this.changelogsService.getChangelogForAdmin(changelogId);
    }
    async updateChangelog(changelogId, updateChangelogDto) {
        return await this.changelogsService.updateChangelog(changelogId, updateChangelogDto);
    }
    async removeChangelog(changelogId) {
        await this.changelogsService.removeChangelog(changelogId);
    }
};
exports.ChangelogsController = ChangelogsController;
__decorate([
    (0, common_1.Get)('/recent'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChangelogsController.prototype, "getRecentChangelog", null);
__decorate([
    (0, common_1.Get)('/all'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChangelogsController.prototype, "getAllChangelog", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_changelog_dto_1.CreateChangelogDto]),
    __metadata("design:returntype", Promise)
], ChangelogsController.prototype, "createChangelog", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/admin/all'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChangelogsController.prototype, "getAllchangelogForAdmin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/admin/:changelogId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('changelogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChangelogsController.prototype, "getchangelogForAdmin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/:changelogId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('changelogId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_changelog_dto_1.UpdateChangelogDto]),
    __metadata("design:returntype", Promise)
], ChangelogsController.prototype, "updateChangelog", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/:changelogId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('changelogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChangelogsController.prototype, "removeChangelog", null);
exports.ChangelogsController = ChangelogsController = __decorate([
    (0, common_1.Controller)('changelog'),
    __metadata("design:paramtypes", [changelogs_service_1.ChangelogsService])
], ChangelogsController);
//# sourceMappingURL=changelogs.controller.js.map