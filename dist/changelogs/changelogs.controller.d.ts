import { ChangelogsService } from '@src/changelogs/changelogs.service';
import { CreateChangelogDto } from '@src/changelogs/dtos/create-changelog.dto';
import { UpdateChangelogDto } from '@src/changelogs/dtos/update-changelog.dto';
export declare class ChangelogsController {
    private readonly changelogsService;
    constructor(changelogsService: ChangelogsService);
    getRecentChangelog(): Promise<import("./dtos/get-changelog.dto").ChangelogDateGroupedDto[]>;
    getAllChangelog(): Promise<import("./dtos/get-changelog.dto").ChangelogDateGroupedDto[]>;
    createChangelog(createChangelogDto: CreateChangelogDto): Promise<import("./entities/changelog.entity").ChangelogEntity>;
    getAllchangelogForAdmin(): Promise<import("./entities/changelog.entity").ChangelogEntity[]>;
    getchangelogForAdmin(changelogId: number): Promise<import("./entities/changelog.entity").ChangelogEntity>;
    updateChangelog(changelogId: number, updateChangelogDto: UpdateChangelogDto): Promise<import("./entities/changelog.entity").ChangelogEntity>;
    removeChangelog(changelogId: number): Promise<void>;
}
