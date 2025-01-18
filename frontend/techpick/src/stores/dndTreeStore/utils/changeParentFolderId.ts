import type { ChildFolderListType } from '@/types/ChildFolderListType';
import type { FolderMapType } from '@/types/FolderMapType';

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
