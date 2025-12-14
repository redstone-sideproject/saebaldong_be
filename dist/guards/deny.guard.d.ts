import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class DenyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
