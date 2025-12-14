declare class ChangelogItemDto {
    date: string;
    type: string;
    description: string;
}
declare class ChangelogDateGroupedDto {
    date: string;
    changes: ChangelogItemDto[];
}
export { ChangelogItemDto, ChangelogDateGroupedDto };
