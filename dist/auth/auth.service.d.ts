import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@src/user/user.service';
import { LoginDto } from '@src/auth/dtos/login.dto';
import { TokenData } from '@src/auth/types/token-data.type';
export declare class AuthService {
    private readonly configService;
    private readonly userService;
    private readonly jwtService;
    constructor(configService: ConfigService, userService: UserService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<TokenData>;
    logout(id: number): Promise<void>;
    validateUser(loginDto: LoginDto): Promise<import("../user/entities/user.entity").UserEntity>;
    refresh(refeshToken: string): Promise<TokenData>;
    generateAccessToken(user: {
        id: number;
        userId: string;
    }): Promise<string>;
    generateRefreshToken(user: {
        id: number;
        userId: string;
    }): Promise<string>;
    setUserRefreshToken(id: number, refreshToken: string): Promise<void>;
}
