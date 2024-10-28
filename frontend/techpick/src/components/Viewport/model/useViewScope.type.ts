export interface ViewState {
  folderIds: number[];
  tagIds: number[];
  pickContents: string[]; // search query
}

export interface ViewAction {
  resetFolderIds: (folders: number[]) => void;
  resetTagIds: (tags: number[]) => void;
  resetPickContents: (contents: string[]) => void;
}
