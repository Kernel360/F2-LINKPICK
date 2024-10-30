// utils/reorderFolder.ts
import { hasIndex } from '@/utils';
import type { UniqueIdentifier } from '@dnd-kit/core';
import type { ChildFolderListType, SelectedFolderListType } from '@/types';

export function reorderFolderInSameParent({
  childFolderList,
  fromId,
  toId,
  selectedFolderList,
}: ReorderFolderPayload): ChildFolderListType {
  const curIndex = childFolderList.findIndex((item) => item === fromId);
  const targetIndex = childFolderList.findIndex((item) => item === toId);

  const nextIndex =
    curIndex < targetIndex
      ? Math.min(targetIndex + 1, childFolderList.length)
      : targetIndex;

  if (!hasIndex(curIndex) || !hasIndex(nextIndex)) return childFolderList;

  const beforeNextIndexList = childFolderList
    .slice(0, nextIndex)
    .filter((index) => !selectedFolderList.includes(index));
  const afterNextIndexList = childFolderList
    .slice(nextIndex)
    .filter((index) => !selectedFolderList.includes(index));

  // 새로운 리스트를 생성하여 반환합니다.
  childFolderList = [
    ...beforeNextIndexList,
    ...selectedFolderList,
    ...afterNextIndexList,
  ];

  return childFolderList;
}

interface ReorderFolderPayload {
  childFolderList: ChildFolderListType;
  fromId: UniqueIdentifier;
  toId: UniqueIdentifier;
  selectedFolderList: SelectedFolderListType;
}
