import { ChangelogTypeUnion } from '@src/changelogs/types/changelog';
export declare class UpdateChangelogDto {
    type?: ChangelogTypeUnion;
    description?: string;
    date?: Date;
}
