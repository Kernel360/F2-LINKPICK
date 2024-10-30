import { hasIndex } from '@/utils';
import type { FolderMapType } from '@/types';

export const isSelectionActive = (length: number) => 0 < length;

export const isSameParentFolder = (
  id: number,
  selectedId: number,
  treeDataMap: FolderMapType
) => {
  return (
    treeDataMap[id].parentFolderId === treeDataMap[selectedId].parentFolderId
  );
};

export const getSelectedFolderRange = (
  id: number,
  selectedList: number[],
  treeDataMap: FolderMapType
) => {
  const parentFolderInfo = treeDataMap[treeDataMap[id].parentFolderId];
  const lastSelectedIndex = parentFolderInfo.childFolderList.findIndex(
    (item) => item === selectedList[0]
  );
  const currentIndex = parentFolderInfo.childFolderList.findIndex(
    (item) => item === id
  );

  if (!hasIndex(lastSelectedIndex) || !hasIndex(currentIndex)) return [];

  const start = Math.min(lastSelectedIndex, currentIndex);
  const end = Math.max(lastSelectedIndex, currentIndex);

  const newSelectedFolderList = parentFolderInfo.childFolderList
    .slice(start, end + 1)
    .filter((selectedItem) => selectedItem !== selectedList[0]);

  /**
   * shift click을 여러번 해도 처음 선택한 기준점이 바뀌지 않게 합니다.
   */
  return [selectedList[0], ...newSelectedFolderList];
};
