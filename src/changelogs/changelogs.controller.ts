import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common'

import { ChangelogsService } from './changelogs.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

import { CreateChangelogDto } from './dtos/create-changelog.dto'
import { UpdateChangelogDto } from './dtos/update-changelog.dto'
@Controller('changelog')
export class ChangelogsController {
  constructor(private readonly changelogsService: ChangelogsService) {}

  @Get('/recent')
  @HttpCode(HttpStatus.OK)
  async getRecentChangelog() {
    return this.changelogsService.getRecentChangelog()
  }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async getAllChangelog() {
    return this.changelogsService.getAllChangelog()
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createChangelog(@Body() createChangelogDto: CreateChangelogDto) {
    return await this.changelogsService.createChagelog(createChangelogDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/admin/all')
  @HttpCode(HttpStatus.OK)
  async getAllchangelogForAdmin() {
    return await this.changelogsService.getAllChangelogForAdmin()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/admin/:changelogId')
  @HttpCode(HttpStatus.OK)
  async getchangelogForAdmin(@Param('changelogId') changelogId: number) {
    return await this.changelogsService.getChangelogForAdmin(changelogId)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:changelogId')
  @HttpCode(HttpStatus.OK)
  async updateChangelog(
    @Param('changelogId') changelogId: number,
    @Body() updateChangelogDto: UpdateChangelogDto,
  ) {
    return await this.changelogsService.updateChangelog(
      changelogId,
      updateChangelogDto,
    )
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:changelogId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeChangelog(@Param('changelogId') changelogId: number) {
    await this.changelogsService.removeChangelog(changelogId)
  }
}
