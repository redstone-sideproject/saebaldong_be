import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
export declare const typeOrmConfig: (env: string, configService: ConfigService) => DataSourceOptions;
