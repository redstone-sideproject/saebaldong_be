import { Injectable, NotFoundException } from '@nestjs/common'

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { ChangelogEntity } from '@src/changelogs/entities/changelog.entity'

import {
  ChangelogDateGroupedDto,
  ChangelogItemDto,
} from '@src/changelogs/dtos/get-changelog.dto'

import { CreateChangelogDto } from '@src/changelogs/dtos/create-changelog.dto'
import { UpdateChangelogDto } from '@src/changelogs/dtos/update-changelog.dto'
import { groupByDate } from '@src/lib'

@Injectable()
export class ChangelogsService {
  constructor(
    @InjectRepository(ChangelogEntity)
    private changelogRepo: Repository<ChangelogEntity>,
  ) {}

  findChangelogById(changelogId: number) {
    if (!changelogId) {
      return null
    }

    return this.changelogRepo.findOneBy({ changelogId })
  }
  async getRecentChangelog(): Promise<ChangelogDateGroupedDto[]> {
    const recentChangelog: ChangelogItemDto[] = await this.changelogRepo
      .createQueryBuilder('changelog')
      .select(['date', 'type', 'description'])
      .orderBy('changelog.date', 'DESC')
      .limit(10)
      .getRawMany()

    return groupByDate(recentChangelog)
  }

  async getAllChangelog(): Promise<ChangelogDateGroupedDto[]> {
    const allChangelog: ChangelogItemDto[] = await this.changelogRepo
      .createQueryBuilder('changelog')
      .select(['date', 'type', 'description'])
      .orderBy('changelog.date', 'DESC')
      .getRawMany()

    return groupByDate(allChangelog)
  }

  async createChagelog(createChangelogDto: CreateChangelogDto) {
    const changelog = this.changelogRepo.create(createChangelogDto)
    return await this.changelogRepo.save(changelog)
  }

  async updateChangelog(
    changelogId: number,
    updateChangelogDto: Partial<UpdateChangelogDto>,
  ) {
    const changelog = await this.findChangelogById(changelogId)
    if (!changelog) {
      throw new NotFoundException('changelog not found')
    }

    Object.assign(changelog, updateChangelogDto)

    return this.changelogRepo.save(changelog)
  }

  async removeChangelog(chnagelogId: number) {
    const changelog = await this.findChangelogById(chnagelogId)

    if (!changelog) {
      throw new NotFoundException('chnagelog not found')
    }

    return this.changelogRepo.remove(changelog)
  }

  async getAllChangelogForAdmin() {
    const changelogs = await this.changelogRepo.find({
      order: {
        date: 'DESC',
      },
    })
    return changelogs
  }

  async getChangelogForAdmin(changelogId: number) {
    const changelog = await this.findChangelogById(changelogId)
    if (!changelog) {
      throw new NotFoundException('changelog not found')
    }

    return changelog
  }
}
