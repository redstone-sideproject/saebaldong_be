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
exports.CreateStreamerDto = void 0;
const class_validator_1 = require("class-validator");
class CreateStreamerDto {
}
exports.CreateStreamerDto = CreateStreamerDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '해시 ID는 필수 입력 값입니다.' }),
    (0, class_validator_1.IsString)({ message: '해시 ID는 문자열이어야 합니다.' }),
    __metadata("design:type", String)
], CreateStreamerDto.prototype, "hashId", void 0);
__decorate([
    (0, class_validator_1.Length)(1, 20, { message: '닉네임은 최소 1자부터 최대 20자까지 가능합니다.' }),
    (0, class_validator_1.IsNotEmpty)({ message: '닉네임은 필수 입력 값입니다.' }),
    (0, class_validator_1.IsString)({ message: '닉네임은 문자열이어야 합니다.' }),
    __metadata("design:type", String)
], CreateStreamerDto.prototype, "nickname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '프로필 이미지는 필수 입력 값입니다.' }),
    (0, class_validator_1.IsString)({ message: '프로필은 문자열이어야 합니다.' }),
    __metadata("design:type", String)
], CreateStreamerDto.prototype, "profileImageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '역할은 문자열이어야 합니다.' }),
    __metadata("design:type", String)
], CreateStreamerDto.prototype, "role", void 0);
//# sourceMappingURL=create-streamer.dto.js.map