import { hasIndex } from '@/utils';
import type { UniqueIdentifier } from '@dnd-kit/core';
import type { FolderMapType, SelectedFolderListType } from '@/types';

export const moveFolderToDifferentParent = ({
  treeDataMap,
  selectedFolderList,
  sourceParentId,
  targetParentId,
  targetId,
}: moveFolderToDifferentParentPayload) => {
  const fromChildFolderList = treeDataMap[sourceParentId].childFolderList;
  treeDataMap[sourceParentId].childFolderList = fromChildFolderList.filter(
    (child) => !selectedFolderList.includes(child)
  );
  const toChildFolderList = treeDataMap[targetParentId].childFolderList;
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
