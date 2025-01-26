import type { FolderRecordType } from '@/types/FolderRecordType';
import { reorderSortableIdList } from './reorderSortableList';

export const moveFoldersToSameParentFolder = ({
  fromId,
  idList,
  nextFolders,
  parentFolderId,
  toId,
}: MoveFoldersToSameParentFolderParamType): void => {
  if (!nextFolders[parentFolderId]) {
    return;
  }

  const prevChildFolderList =
    nextFolders[parentFolderId].childFolderIdOrderedList;
  nextFolders[parentFolderId].childFolderIdOrderedList = reorderSortableIdList({
    sortableIdList: prevChildFolderList,
    selectedFolderList: idList,
    fromId,
    toId,
  });
};

type MoveFoldersToSameParentFolderParamType = {
  nextFolders: FolderRecordType;
  parentFolderId: number;
  idList: number[];
  fromId: number;
  toId: number;
};
