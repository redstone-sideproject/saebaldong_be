import { ChangelogTypeUnion } from '@src/changelogs/types/changelog';
export declare class CreateChangelogDto {
    type: ChangelogTypeUnion;
    description: string;
    date: Date;
}
