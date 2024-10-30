export type FolderType = {
  id: number;
  name: string;
  parentFolderId: null | number;
  childFolderList: FolderType[];
};
