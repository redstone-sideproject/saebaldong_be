import { Repository } from 'typeorm';
import { ChangelogEntity } from '@src/changelogs/entities/changelog.entity';
import { ChangelogDateGroupedDto } from '@src/changelogs/dtos/get-changelog.dto';
import { CreateChangelogDto } from '@src/changelogs/dtos/create-changelog.dto';
import { UpdateChangelogDto } from '@src/changelogs/dtos/update-changelog.dto';
export declare class ChangelogsService {
    private changelogRepo;
    constructor(changelogRepo: Repository<ChangelogEntity>);
    findChangelogById(changelogId: number): Promise<ChangelogEntity | null> | null;
    getRecentChangelog(): Promise<ChangelogDateGroupedDto[]>;
    getAllChangelog(): Promise<ChangelogDateGroupedDto[]>;
    createChagelog(createChangelogDto: CreateChangelogDto): Promise<ChangelogEntity>;
    updateChangelog(changelogId: number, updateChangelogDto: Partial<UpdateChangelogDto>): Promise<ChangelogEntity>;
    removeChangelog(chnagelogId: number): Promise<ChangelogEntity>;
    getAllChangelogForAdmin(): Promise<ChangelogEntity[]>;
    getChangelogForAdmin(changelogId: number): Promise<ChangelogEntity>;
}
