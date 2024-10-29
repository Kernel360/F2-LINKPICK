import type { UniqueIdentifier } from '@dnd-kit/core';

export type FolderType = {
  id: number;
  name: string;
  parentFolderId: number;
  childFolderList: number[];
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
