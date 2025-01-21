'use client';

import { ROUTES } from '@/constants/route';
import { useDisclosure } from '@/hooks/useDisclosure';
import useHandleRequestShareFolder from '@/hooks/useHandleRequestShareFolder';
import { useFetchFolders } from '@/queries/useFetchFolders';
import { useUpdateFolderName } from '@/queries/useUpdateFolderName';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import type { FolderRecordType } from '@/types/FolderRecordType';
import { getSelectedFolderRange } from '@/utils/getSelectedFolderRange';
import { isSameParentFolder } from '@/utils/isSameParentFolder';
import { isSelectionActive } from '@/utils/isSelectionActive';
import { FolderClosedIcon, FolderOpenIcon, FolderUp } from 'lucide-react';
import { useState } from 'react';
import type { MouseEvent } from 'react';
import { FolderContextMenu } from './FolderContextMenu';
import { FolderDraggable } from './FolderDraggable';
import { FolderInput } from './FolderInput';
import { FolderLinkItem } from './FolderLinkItem';
import { MoveFolderToRecycleBinDialog } from './MoveFolderToRecycleBinDialog';
import ShareFolderDialog from './ShareFolderDialog';

export const FolderListItem = ({ id, name }: FolderInfoItemProps) => {
  const {
    selectedFolderList,
    setSelectedFolderList,
    focusFolderId,
    hoverFolderId,
    selectSingleFolder,
  } = useTreeStore();
  const { data: folderRecord = {} } = useFetchFolders();
  const { mutate: updateFolderName } = useUpdateFolderName();

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

  const handleShiftSelect = (id: number, folderRecord: FolderRecordType) => {
    if (
      !focusFolderId ||
      !isSameParentFolder({
        folderId1: id,
        folderId2: focusFolderId,
        folderRecord,
      })
    ) {
      return;
    }

    const newSelectedList = getSelectedFolderRange({
      startFolderId: focusFolderId,
      endFolderId: id,
      folderRecord,
    });
    setSelectedFolderList(newSelectedList);
  };

  const handleClick = (id: number, event: MouseEvent) => {
    if (event.shiftKey && isSelectionActive(selectedFolderList.length)) {
      event.preventDefault();
      handleShiftSelect(id, folderRecord);
      return;
    }

    setSelectedFolderList([id]);
  };

  const onUpdate = (newFolderName: string) => {
    updateFolderName({ id, name: newFolderName });
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
            folderId={id}
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
