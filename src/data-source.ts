import 'tsconfig-paths/register'
import { DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { typeOrmConfig } from './config/typeorm.config'
import { config } from 'dotenv'

const env = process.env.NODE_ENV || 'development'

export const getEnvFilePath = () => {
  return '.env' + (env == 'development' ? '.development' : '.production')
}

config({ path: getEnvFilePath() })
const configService = new ConfigService()

// DataSource 인스턴스 생성
export const AppDataSource = new DataSource(typeOrmConfig(env, configService))
