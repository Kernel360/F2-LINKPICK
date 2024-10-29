import type { UniqueIdentifier } from '@dnd-kit/core';

export type SelectedFolderListType = number[];

export type ChildFolderListType = number[];

export type FolderType = {
  id: number;
  name: string;
  parentFolderId: number;
  childFolderList: ChildFolderListType;
};

export type FolderMapType = Record<string, FolderType>;

export type DnDCurrentType = {
  id: UniqueIdentifier;
  sortable: {
    containerId: string | null;
    items: UniqueIdentifier[];
    index: number;
  };
};
