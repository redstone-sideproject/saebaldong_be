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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(configService, userService, jwtService) {
        this.configService = configService;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto);
        const accessToken = await this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);
        await this.setUserRefreshToken(user.id, refreshToken);
        return { accessToken, refreshToken };
    }
    async logout(id) {
        await this.userService.removeRefreshToken(id);
    }
    async validateUser(loginDto) {
        const { userId, password } = loginDto;
        const user = await this.userService.findByUserId(userId);
        if (!user)
            throw new common_1.UnauthorizedException();
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
            throw new common_1.UnauthorizedException();
        return user;
    }
    async refresh(refeshToken) {
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(refeshToken, {
                secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            });
        }
        catch (e) {
            if (e instanceof jwt_1.TokenExpiredError) {
                throw new common_1.UnauthorizedException('Refresh token expired');
            }
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const isValid = await this.userService.validateRefreshToken(payload.sub, refeshToken);
        if (!isValid)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        const accessToken = await this.generateAccessToken({
            id: payload.sub,
            userId: payload.userId,
        });
        const refreshToken = await this.generateRefreshToken({
            id: payload.sub,
            userId: payload.userId,
        });
        await this.setUserRefreshToken(payload.sub, refreshToken);
        return { accessToken, refreshToken };
    }
    async generateAccessToken(user) {
        const payload = { sub: user.id, userId: user.userId };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXP'),
        });
        return accessToken;
    }
    async generateRefreshToken(user) {
        const payload = { sub: user.id, userId: user.userId };
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXP'),
        });
        return refreshToken;
    }
    async setUserRefreshToken(id, refreshToken) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userService.updateRefreshToken(id, hashedRefreshToken);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map