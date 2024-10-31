import type { MouseEvent } from 'react';
import { Folder } from 'lucide-react';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import {
  folderInfoItemStyle,
  draggingItem,
  selectedDragItemStyle,
  FolderIconStyle,
} from './folderInfoItem.css';
import {
  getSelectedFolderRange,
  isSameParentFolder,
  isSelectionActive,
} from './folderInfoItem.util';
import { Text } from '../Text';
import type { FolderMapType } from '@/types';

export const FolderInfoItem = ({ id, name }: FolderInfoItemProps) => {
  const {
    treeDataMap,
    selectedFolderList,
    setSelectedFolderList,
    isDragging,
    setFocusFolderId,
    focusFolderId,
  } = useTreeStore();

  const isSelected = selectedFolderList.includes(id);

  const selectSingleFolder = (id: number) => {
    setFocusFolderId(id);
    setSelectedFolderList([id]);
  };

  const handleShiftSelect = (
    id: number,
    selectedList: number[],
    treeDataMap: FolderMapType
  ) => {
    if (!focusFolderId || !isSameParentFolder(id, focusFolderId, treeDataMap)) {
      selectSingleFolder(id);
      return;
    }

    const newSelectedList = getSelectedFolderRange({
      startFolderId: focusFolderId,
      endFolderId: id,
      treeDataMap,
    });
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
      className={`${folderInfoItemStyle}  ${isDragging ? draggingItem : ''} ${isSelected ? selectedDragItemStyle : ''}`}
      onClick={(event) => handleClick(id, event)}
    >
      <Folder className={FolderIconStyle} />
      <Text>{name}</Text>
    </div>
  );
};

interface FolderInfoItemProps {
  id: number;
  name: string;
}
