import type { ChildFolderListType, FolderMapType } from '@/types';

export const changeParentFolderId = ({
  treeDataMap,
  childFolderList,
  parentId,
}: changeParentFolderIdPayload) => {
  for (const childFolderId of childFolderList) {
    treeDataMap[childFolderId].parentFolderId = Number(parentId);
  }

  return treeDataMap;
};

interface changeParentFolderIdPayload {
  treeDataMap: FolderMapType;
  childFolderList: ChildFolderListType;
  parentId: number | string;
}
