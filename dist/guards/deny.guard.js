"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DenyGuard = void 0;
const common_1 = require("@nestjs/common");
let DenyGuard = class DenyGuard {
    canActivate(context) {
        throw new common_1.ForbiddenException('해당 API는 접근할 수 없습니다.');
    }
};
exports.DenyGuard = DenyGuard;
exports.DenyGuard = DenyGuard = __decorate([
    (0, common_1.Injectable)()
], DenyGuard);
//# sourceMappingURL=deny.guard.js.map