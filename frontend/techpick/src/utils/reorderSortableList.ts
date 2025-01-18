import type { ChildFolderListType } from '@/types/ChildFolderListType';
import type { SelectedFolderListType } from '@/types/SelectedFolderListType';
import type { SelectedPickIdListType } from '@/types/SelectedPickIdListType';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { hasIndex } from './hasIndex';

export const reorderSortableIdList = ({
  sortableIdList,
  fromId,
  toId,
  selectedFolderList,
}: ReorderSortableIdListPayload) => {
  const curIndex = sortableIdList.findIndex((item) => item === fromId);
  const targetIndex = sortableIdList.findIndex((item) => item === toId);

  const nextIndex =
    curIndex < targetIndex
      ? Math.min(targetIndex + 1, sortableIdList.length)
      : targetIndex;

  if (!hasIndex(curIndex) || !hasIndex(nextIndex)) return sortableIdList;

  const beforeNextIndexList = sortableIdList
    .slice(0, nextIndex)
    .filter((index) => !selectedFolderList.includes(index));
  const afterNextIndexList = sortableIdList
    .slice(nextIndex)
    .filter((index) => !selectedFolderList.includes(index));

  // 새로운 리스트를 생성하여 반환합니다.
  const newSortableIdList = [
    ...beforeNextIndexList,
    ...selectedFolderList,
    ...afterNextIndexList,
  ];

  return newSortableIdList;
};

interface ReorderSortableIdListPayload {
  sortableIdList: ChildFolderListType | number[];
  fromId: UniqueIdentifier;
  toId: UniqueIdentifier;
  selectedFolderList: SelectedFolderListType | SelectedPickIdListType;
}
