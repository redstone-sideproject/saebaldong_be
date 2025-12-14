import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DataSource } from 'typeorm';
export declare function Transactional(): MethodDecorator & ClassDecorator;
export declare class TransactionInterceptor implements NestInterceptor {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>>;
}
