import type { FolderMapType } from '@/types/FolderMapType';
import type { SelectedFolderListType } from '@/types/SelectedFolderListType';
import { hasIndex } from '@/utils/hasIndex';
import type { UniqueIdentifier } from '@dnd-kit/core';

export const moveFolderToDifferentParent = ({
  treeDataMap,
  selectedFolderList,
  sourceParentId,
  targetParentId,
  targetId,
}: moveFolderToDifferentParentPayload) => {
  const fromChildFolderList =
    treeDataMap[sourceParentId].childFolderIdOrderedList;
  treeDataMap[sourceParentId].childFolderIdOrderedList =
    fromChildFolderList.filter((child) => !selectedFolderList.includes(child));
  const toChildFolderList =
    treeDataMap[targetParentId].childFolderIdOrderedList;
  const targetIndex = toChildFolderList.findIndex((item) => item === targetId);

  if (!hasIndex(targetIndex)) {
    return;
  }

  const nextIndex =
    targetIndex === 0
      ? targetIndex
      : Math.min(targetIndex + 1, toChildFolderList.length);
  toChildFolderList.splice(nextIndex, 0, ...selectedFolderList);

  return treeDataMap;
};

interface moveFolderToDifferentParentPayload {
  treeDataMap: FolderMapType;
  selectedFolderList: SelectedFolderListType;
  sourceParentId: UniqueIdentifier;
  targetParentId: UniqueIdentifier;
  targetId: UniqueIdentifier;
}
