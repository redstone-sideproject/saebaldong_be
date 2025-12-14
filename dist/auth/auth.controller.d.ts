import { AuthService } from '@src/auth/auth.service';
import { LoginDto } from '@src/auth/dtos/login.dto';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    login(loginDto: LoginDto, res: Response): Promise<{
        message: string;
    }>;
    authMe(req: Request): {
        success: boolean;
        userId: string;
    };
    refresh(req: Request, res: Response): Promise<{
        message: string;
    }>;
    logout(req: Request, res: Response): Promise<{
        message: string;
    }>;
}
