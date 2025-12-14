"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangelogsModule = void 0;
const common_1 = require("@nestjs/common");
const changelogs_controller_1 = require("./changelogs.controller");
const changelogs_service_1 = require("./changelogs.service");
const typeorm_1 = require("@nestjs/typeorm");
const changelog_entity_1 = require("./entities/changelog.entity");
let ChangelogsModule = class ChangelogsModule {
};
exports.ChangelogsModule = ChangelogsModule;
exports.ChangelogsModule = ChangelogsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([changelog_entity_1.ChangelogEntity])],
        controllers: [changelogs_controller_1.ChangelogsController],
        providers: [changelogs_service_1.ChangelogsService],
    })
], ChangelogsModule);
//# sourceMappingURL=changelogs.module.js.map