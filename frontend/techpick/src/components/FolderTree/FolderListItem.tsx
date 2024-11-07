import { useState } from 'react';
import type { MouseEvent } from 'react';
import { ROUTES } from '@/constants';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { FolderContextMenu } from './FolderContextMenu';
import { FolderInput } from './FolderInput';
import { FolderLinkItem } from './FolderLinkItem';
import {
  getSelectedFolderRange,
  isSameParentFolder,
  isSelectionActive,
} from './folderListItem.util';
import type { FolderMapType } from '@/types';

export const FolderListItem = ({ id, name }: FolderInfoItemProps) => {
  const {
    treeDataMap,
    selectedFolderList,
    setSelectedFolderList,
    focusFolderId,
    updateFolderName,
    moveFolderToRecycleBin,
    selectSingleFolder,
  } = useTreeStore();
  const isSelected = selectedFolderList.includes(id);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleShiftSelect = (id: number, treeDataMap: FolderMapType) => {
    if (!focusFolderId || !isSameParentFolder(id, focusFolderId, treeDataMap)) {
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
      event.preventDefault();
      handleShiftSelect(id, treeDataMap);
    }
  };

  const onUpdate = (newFolderName: string) => {
    updateFolderName({ folderId: id, newFolderName });
    setIsUpdate(false);
  };

  if (isUpdate) {
    return (
      <FolderInput
        onSubmit={onUpdate}
        onClickOutSide={() => {
          setIsUpdate(false);
        }}
        initialValue={name}
      />
    );
  }

  return (
    <FolderContextMenu
      showRenameInput={() => {
        setIsUpdate(true);
      }}
      deleteFolder={() => {
        moveFolderToRecycleBin({ deleteFolderId: id });
      }}
      onShow={() => {
        selectSingleFolder(id);
      }}
    >
      <FolderLinkItem
        href={ROUTES.FOLDER_DETAIL(id)}
        isSelected={isSelected}
        name={name}
        onClick={(event) => handleClick(id, event)}
      />
    </FolderContextMenu>
  );
};

interface FolderInfoItemProps {
  id: number;
  name: string;
}
