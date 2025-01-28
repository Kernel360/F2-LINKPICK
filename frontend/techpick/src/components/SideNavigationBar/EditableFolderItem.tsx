'use client';

import type { FolderIdType } from '@/types/FolderIdType';
import dynamic from 'next/dynamic';
import { useContext } from 'react';
import { DeleteFolderDialog } from './DeleteFolderDialog';
import { EditFolderContextMenu } from './EditFolderContextMenu';
import { FolderDraggable } from './FolderDraggable';
import { FolderNavigationItem } from './FolderNavigationItem';
import { UpdateFolderNameInput } from './UpdateFolderNameInput';
import { UpdateFolderStatusContext } from './UpdateFolderStatusProvider';
const ShareFolderDialog = dynamic(
  () => import('./ShareFolderDialog').then((mod) => mod.ShareFolderDialog),
  {
    ssr: false,
  },
);

export function EditableFolderItem({ folderId }: EditableFolderItem) {
  const { isUpdateFolder } = useContext(UpdateFolderStatusContext);

  if (isUpdateFolder) {
    return <UpdateFolderNameInput folderId={folderId} />;
  }

  return (
    <div>
      <EditFolderContextMenu folderId={folderId}>
        <FolderDraggable folderId={folderId}>
          <FolderNavigationItem folderId={folderId} />
        </FolderDraggable>
      </EditFolderContextMenu>
      <ShareFolderDialog />
      <DeleteFolderDialog deleteFolderId={folderId} />
    </div>
  );
}

interface EditableFolderItem {
  folderId: FolderIdType;
}
