export interface ViewScope {
  folderIds: number[];

  tagIds: number[];

  pickContents: string[]; // search query

  resetFolderIds: (folders: number[]) => void;

  resetTagIds: (tags: number[]) => void;

  resetPickContents: (contents: string[]) => void;

  resetAll: (
    folderIds?: number[],
    tagIds?: number[],
    pickContents?: string[]
  ) => void;
}
