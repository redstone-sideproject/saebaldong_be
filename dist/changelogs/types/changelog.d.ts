export declare const changelogTypeKeys: {
    readonly ADD: "ADD";
    readonly FIX: "FIX";
};
type ChangelogTypeUnion = (typeof changelogTypeKeys)[keyof typeof changelogTypeKeys];
export type { ChangelogTypeUnion };
