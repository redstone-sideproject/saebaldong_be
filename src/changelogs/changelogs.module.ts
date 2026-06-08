import { Module } from '@nestjs/common'
import { ChangelogsController } from './changelogs.controller'
import { ChangelogsService } from './changelogs.service'

import { TypeOrmModule } from '@nestjs/typeorm'

import { ChangelogEntity } from './entities/changelog.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ChangelogEntity])],
  controllers: [ChangelogsController],
  providers: [ChangelogsService],
})
export class ChangelogsModule {}
