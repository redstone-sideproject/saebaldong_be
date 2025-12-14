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
exports.ChangelogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const changelog_entity_1 = require("./entities/changelog.entity");
const lib_1 = require("../lib");
let ChangelogsService = class ChangelogsService {
    constructor(changelogRepo) {
        this.changelogRepo = changelogRepo;
    }
    findChangelogById(changelogId) {
        if (!changelogId) {
            return null;
        }
        return this.changelogRepo.findOneBy({ changelogId });
    }
    async getRecentChangelog() {
        const recentChangelog = await this.changelogRepo
            .createQueryBuilder('changelog')
            .select(['date', 'type', 'description'])
            .orderBy('changelog.date', 'DESC')
            .limit(10)
            .getRawMany();
        return (0, lib_1.groupByDate)(recentChangelog);
    }
    async getAllChangelog() {
        const allChangelog = await this.changelogRepo
            .createQueryBuilder('changelog')
            .select(['date', 'type', 'description'])
            .orderBy('changelog.date', 'DESC')
            .getRawMany();
        return (0, lib_1.groupByDate)(allChangelog);
    }
    async createChagelog(createChangelogDto) {
        const changelog = this.changelogRepo.create(createChangelogDto);
        return await this.changelogRepo.save(changelog);
    }
    async updateChangelog(changelogId, updateChangelogDto) {
        const changelog = await this.findChangelogById(changelogId);
        if (!changelog) {
            throw new common_1.NotFoundException('changelog not found');
        }
        Object.assign(changelog, updateChangelogDto);
        return this.changelogRepo.save(changelog);
    }
    async removeChangelog(chnagelogId) {
        const changelog = await this.findChangelogById(chnagelogId);
        if (!changelog) {
            throw new common_1.NotFoundException('chnagelog not found');
        }
        return this.changelogRepo.remove(changelog);
    }
    async getAllChangelogForAdmin() {
        const changelogs = await this.changelogRepo.find({
            order: {
                date: 'DESC',
            },
        });
        return changelogs;
    }
    async getChangelogForAdmin(changelogId) {
        const changelog = await this.findChangelogById(changelogId);
        if (!changelog) {
            throw new common_1.NotFoundException('changelog not found');
        }
        return changelog;
    }
};
exports.ChangelogsService = ChangelogsService;
exports.ChangelogsService = ChangelogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(changelog_entity_1.ChangelogEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ChangelogsService);
//# sourceMappingURL=changelogs.service.js.map