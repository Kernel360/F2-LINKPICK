'use client';

import { useState } from 'react';
import type { MouseEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { FolderClosedIcon, FolderOpenIcon } from 'lucide-react';
import { ROUTES } from '@/constants';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { isSelectionActive } from '@/utils';
import { FolderContextMenu } from './FolderContextMenu';
import { FolderInput } from './FolderInput';
import { FolderLinkItem } from './FolderLinkItem';
import {
  getSelectedFolderRange,
  isSameParentFolder,
} from './folderListItem.util';
import { MoveFolderToRecycleBinDialog } from './MoveFolderToRecycleBinDialog';
import type { FolderMapType } from '@/types';

export const FolderListItem = ({ id, name }: FolderInfoItemProps) => {
  const {
    treeDataMap,
    selectedFolderList,
    setSelectedFolderList,
    focusFolderId,
    hoverFolderId,
    updateFolderName,
    selectSingleFolder,
  } = useTreeStore();
  const [isUpdate, setIsUpdate] = useState(false);
  const isSelected = selectedFolderList.includes(id);
  const isHover = id === hoverFolderId;

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
    <Dialog.Root>
      <FolderContextMenu
        showRenameInput={() => {
          setIsUpdate(true);
        }}
        onShow={() => {
          selectSingleFolder(id);
        }}
      >
        <FolderLinkItem
          href={ROUTES.FOLDER_DETAIL(id)}
          isSelected={isSelected}
          isHovered={isHover}
          icon={isSelected ? FolderOpenIcon : FolderClosedIcon}
          name={name}
          onClick={(event) => handleClick(id, event)}
        />
      </FolderContextMenu>
      <MoveFolderToRecycleBinDialog deleteFolderId={id} />
    </Dialog.Root>
  );
};

interface FolderInfoItemProps {
  id: number;
  name: string;
}
