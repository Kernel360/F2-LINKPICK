'use client';

import { useState } from 'react';
import type { MouseEvent } from 'react';
import { FolderClosedIcon, FolderOpenIcon, FolderUp } from 'lucide-react';
import { ROUTES } from '@/constants';
import { useDisclosure } from '@/hooks';
import useHandleRequestShareFolder from '@/hooks/useHandleRequestShareFolder';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { isSelectionActive } from '@/utils';
import { FolderContextMenu } from './FolderContextMenu';
import { FolderDraggable } from './FolderDraggable';
import { FolderInput } from './FolderInput';
import { FolderLinkItem } from './FolderLinkItem';
import {
  getSelectedFolderRange,
  isSameParentFolder,
} from './folderListItem.util';
import { MoveFolderToRecycleBinDialog } from './MoveFolderToRecycleBinDialog';
import ShareFolderDialog from './ShareFolderDialog';
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
  const {
    isOpen: isOpenRemoveDialog,
    onOpen: onOpenRemoveDialog,
    onClose: onCloseRemoveDialog,
  } = useDisclosure();
  const {
    uuid,
    isShareFolder,
    isOpenShareDialog,
    onCloseShareDialog,
    handleOpenShareDialog,
  } = useHandleRequestShareFolder(id);

  let folderIcon = FolderClosedIcon;
  if (isSelected && !isShareFolder) {
    folderIcon = FolderOpenIcon;
  } else if (isShareFolder) {
    folderIcon = FolderUp;
  }

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
    <>
      <FolderContextMenu
        shareText={isShareFolder ? '비공개하기' : '공개하기'}
        showRenameInput={() => {
          setIsUpdate(true);
        }}
        onClickShareFolder={handleOpenShareDialog}
        onShow={() => {
          selectSingleFolder(id);
        }}
        onClickRemoveFolder={onOpenRemoveDialog}
      >
        <FolderDraggable id={id}>
          <FolderLinkItem
            href={ROUTES.FOLDER_DETAIL(id)}
            isSelected={isSelected}
            isHovered={isHover}
            icon={folderIcon}
            name={name}
            onClick={(event) => handleClick(id, event)}
          />
        </FolderDraggable>
      </FolderContextMenu>
      <ShareFolderDialog
        uuid={uuid}
        isOpen={isOpenShareDialog}
        onOpenChange={onCloseShareDialog}
      />
      <MoveFolderToRecycleBinDialog
        deleteFolderId={id}
        isOpen={isOpenRemoveDialog}
        onOpenChange={onCloseRemoveDialog}
      />
    </>
  );
};

interface FolderInfoItemProps {
  id: number;
  name: string;
}
