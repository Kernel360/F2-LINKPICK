import type { MouseEvent } from 'react';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import {
  draggableItem,
  draggingItem,
  selectedDragItemStyle,
} from './folderInfoItem.css';
import {
  getSelectedFolderRange,
  isSameParentFolder,
  isSelectionActive,
} from './folderInfoItem.util';
import type { FolderMapType } from '@/types';

export const FolderInfoItem = ({ id, name }: FolderInfoItemProps) => {
  const { treeDataMap, selectedFolderList, setSelectedFolderList, isDragging } =
    useTreeStore();

  const isSelected = selectedFolderList.includes(id);

  const selectSingleFolder = (id: number) => {
    setSelectedFolderList([id]);
  };

  const handleShiftSelect = (
    id: number,
    selectedList: number[],
    treeDataMap: FolderMapType
  ) => {
    if (!isSameParentFolder(id, selectedList[0], treeDataMap)) {
      selectSingleFolder(id);
      return;
    }

    const newSelectedList = getSelectedFolderRange(
      id,
      selectedList,
      treeDataMap
    );
    setSelectedFolderList(newSelectedList);
  };

  const handleClick = (id: number, event: MouseEvent) => {
    if (event.shiftKey && isSelectionActive(selectedFolderList.length)) {
      handleShiftSelect(id, selectedFolderList, treeDataMap);
    } else {
      selectSingleFolder(id);
    }
  };

  return (
    <div
      className={`${draggableItem} ${isDragging ? draggingItem : ''} ${isSelected ? selectedDragItemStyle : ''}`}
      onClick={(event) => handleClick(id, event)}
    >
      {name}
    </div>
  );
};

interface FolderInfoItemProps {
  id: number;
  name: string;
}
