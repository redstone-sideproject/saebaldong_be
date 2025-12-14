import { UserEntity } from '@src/user/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<UserEntity>);
    findByUserId(userId: string): Promise<UserEntity | null>;
    create(userId: string, passwordHash: string, isAdmin?: boolean): Promise<UserEntity>;
    updateRefreshToken(id: number, refreshToken: string): Promise<void>;
    removeRefreshToken(id: number): Promise<void>;
    validateRefreshToken(id: number, refreshToken: string): Promise<boolean>;
}
