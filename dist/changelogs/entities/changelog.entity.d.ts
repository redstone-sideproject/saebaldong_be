import { ChangelogTypeUnion } from '@src/changelogs/types/changelog';
export declare class ChangelogEntity {
    changelogId: number;
    type: ChangelogTypeUnion;
    description: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}
