'use client';

import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { folderTreeHeaderLayout } from './folderTreeHeader.css';
import { ShowCreateFolderInputButton } from './ShowCreateFolderInputButton';

export function FolderTreeHeader() {
  const rootFolderId = useTreeStore((state) => state.rootFolderId);

  return (
    <div className={folderTreeHeaderLayout}>
      <ShowCreateFolderInputButton newFolderParentId={rootFolderId} />
    </div>
  );
}
