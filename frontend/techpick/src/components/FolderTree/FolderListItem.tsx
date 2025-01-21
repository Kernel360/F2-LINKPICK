'use client';

import { ROUTES } from '@/constants/route';
import { useDisclosure } from '@/hooks/useDisclosure';
import useHandleRequestShareFolder from '@/hooks/useHandleRequestShareFolder';
import { useUpdateFolderName } from '@/queries/useUpdateFolderName';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { FolderClosedIcon, FolderOpenIcon, FolderUp } from 'lucide-react';
import { useContext, useState } from 'react';
import { ActiveNavigationItemIdContext } from './ActiveNavigationItemIdProvider';
import { FolderContextMenu } from './FolderContextMenu';
import { FolderDraggable } from './FolderDraggable';
import { FolderInput } from './FolderInput';
import { FolderLinkItem } from './FolderLinkItem';
import { MoveFolderToRecycleBinDialog } from './MoveFolderToRecycleBinDialog';
import ShareFolderDialog from './ShareFolderDialog';

export const FolderListItem = ({ id, name }: FolderInfoItemProps) => {
  const { setSelectedFolderList, hoverFolderId } = useTreeStore();
  const { mutate: updateFolderName } = useUpdateFolderName();
  const activeNavigationItemId = useContext(ActiveNavigationItemIdContext);

  const [isUpdate, setIsUpdate] = useState(false);
  const isSelected = id === activeNavigationItemId;
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

  const handleClick = (id: number) => {
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
        onShow={() => {}}
        onClickRemoveFolder={onOpenRemoveDialog}
      >
        <FolderDraggable id={id}>
          <FolderLinkItem
            href={ROUTES.FOLDER_DETAIL(id)}
            isSelected={isSelected}
            isHovered={isHover}
            icon={folderIcon}
            name={name}
            onClick={() => handleClick(id)}
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
