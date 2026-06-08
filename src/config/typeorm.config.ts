import { DataSourceOptions } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { Streamer } from '../streamers/streamer.entity'
import { Timeline } from '../timeline/timeline.entity'
import { Participation } from '../timeline/participation.entity'
import { ChangelogEntity } from '../changelogs/entities/changelog.entity'
import { UserEntity } from '../user/entities/user.entity'
import { ValorantMatchEntity } from '../valorant-match/entities/valorant-match.entitiy'
import { ValorantMatchPlayerEntity } from '../valorant-match/entities/valorant-match-player.entity'

export const typeOrmConfig = (
  env: string,
  configService: ConfigService,
): DataSourceOptions => {
  switch (env) {
    case 'production':
      return {
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          Streamer,
          Timeline,
          Participation,
          ChangelogEntity,
          ValorantMatchEntity,
          ValorantMatchPlayerEntity,
          UserEntity,
        ],
        migrations: ['dist/migrations/*.js'],
        synchronize: false,
        logging: true,
        useUTC: true,
      }

    case 'development':
    default:
      return {
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          Streamer,
          Timeline,
          Participation,
          ChangelogEntity,
          ValorantMatchEntity,
          ValorantMatchPlayerEntity,
          UserEntity,
        ],
        migrations: ['dist/migrations/*.js'],
        synchronize: false,
        logging: true,
        useUTC: true,
      }
  }
}
