export interface ViewerState {
  folderIds: number[];
  tagIds: number[];
  pickContents: string[]; // search query
}

export interface ViewerStateAction {
  setFolderIds: (folderIds: number[]) => void;
  setTagIds: (tagIds: number[]) => void;
  setPickContents: (contents: string[]) => void;
}

export interface ViewerStateReader {
  readFolderIds: () => readonly number[];
  readTagIds: () => readonly number[];
  readPickContents: () => readonly string[];
}

export interface ViewerStateWriter {
  writeFolderIds: (folderIds: number[]) => void;
  writeTagIds: (tagIds: number[]) => void;
  writePickContents: (contents: string[]) => void;
}
