'use client';

import type { FolderIdType } from '@/types/FolderIdType';
import { useContext } from 'react';
import { DeleteFolderDialog } from './DeleteFolderDialog';
import { EditFolderContextMenu } from './EditFolderContextMenu';
import { FolderDraggable } from './FolderDraggable';
import { FolderNavigationItem } from './FolderNavigationItem';
const ShareFolderDialog = dynamic(
  () => import('./ShareFolderDialog').then((mod) => mod.ShareFolderDialog),
  {
    ssr: false,
  },
);
import dynamic from 'next/dynamic';
import { UpdateFolderNameInput } from './UpdateFolderNameInput';
import { UpdateFolderStatusContext } from './UpdateFolderStatusProvider';

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
