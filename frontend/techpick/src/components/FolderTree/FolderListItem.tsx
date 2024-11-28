'use client';

import { useState } from 'react';
import type { MouseEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FolderClosedIcon, FolderOpenIcon } from 'lucide-react';
import { shareFolder } from '@/apis/folder/shareFolder';
import { ROUTES } from '@/constants';
import { useShareDialogOpen } from '@/hooks/useShareDialogOpen';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { isSelectionActive } from '@/utils';
import { FolderContextMenu } from './FolderContextMenu';
import { FolderInput } from './FolderInput';
import { FolderLinkItem } from './FolderLinkItem';
import {
  getSelectedFolderRange,
  isSameParentFolder,
} from './folderListItem.util';
import ShareFolderDialog from './ShareFolderDialog';
import type { FolderMapType } from '@/types';

export const FolderListItem = ({ id, name }: FolderInfoItemProps) => {
  const router = useRouter();

  const { folderId: urlFolderId } = useParams<{ folderId: string }>();
  const {
    treeDataMap,
    selectedFolderList,
    setSelectedFolderList,
    focusFolderId,
    hoverFolderId,
    updateFolderName,
    moveFolderToRecycleBin,
    selectSingleFolder,
  } = useTreeStore();
  const { isDialogOpen, uuid, handleDialogOpen, handleDialogClose } =
    useShareDialogOpen();
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

  const handleShareFolder = async () => {
    const response = await shareFolder({
      name,
      folderIdList: [id],
    });
    handleDialogOpen(response.uuid);
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
        showRenameInput={() => {
          setIsUpdate(true);
        }}
        deleteFolder={() => {
          moveFolderToRecycleBin({ deleteFolderId: id });

          if (Number(urlFolderId) === id) {
            router.push(ROUTES.FOLDERS_UNCLASSIFIED);
          }
        }}
        shareFolder={handleShareFolder}
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
      {isDialogOpen && (
        <ShareFolderDialog onClose={handleDialogClose} uuid={uuid} />
      )}
    </>
  );
};

interface FolderInfoItemProps {
  id: number;
  name: string;
}
