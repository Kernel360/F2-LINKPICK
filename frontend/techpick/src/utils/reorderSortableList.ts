import type { ChildFolderListType } from '@/types/ChildFolderListType';
import type { SelectedFolderListType } from '@/types/SelectedFolderListType';
import type { SelectedPickIdListType } from '@/types/SelectedPickIdListType';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { hasIndex } from './hasIndex';

/**
 * 배열을 재배치해주는 함수입니다.
 *
 * @param sortableIdList 정렬의 대상의 되는 리스트입니다.
 * @param fromId 이동하는 목록의 기준점입니다.
 * @param toId 이동할 곳입니다. [1,2,3,4,5] 에서 2를 4로 옮긴다면 4가 해당 값입니다.
 * @param selectedFolderList 이동 목록입니다.
 *
 */
export const reorderSortableIdList = ({
  sortableIdList,
  fromId,
  toId,
  selectedFolderList,
}: ReorderSortableIdListParams) => {
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

interface ReorderSortableIdListParams {
  sortableIdList: ChildFolderListType;
  fromId: UniqueIdentifier;
  toId: UniqueIdentifier;
  selectedFolderList: SelectedFolderListType | SelectedPickIdListType;
}
