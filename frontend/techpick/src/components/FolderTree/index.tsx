'use client';

import { useEffect } from 'react';
import { useCreateFolderInputStore } from '@/stores/createFolderInputStore';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { FolderTreeHeader } from './FolderTreeHeader';
import { HorizontalResizableContainer } from './HorizontalResizableContainer';
import { ShowCreateFolderInputButton } from './ShowCreateFolderInputButton';
import { treeLayout } from './tree.css';
import { TreeNode } from './TreeNode';

export function FolderTree() {
  const { newFolderParentId } = useCreateFolderInputStore();
  const { getFolders, getBasicFolders } = useTreeStore();
  const rootFolderId = useTreeStore((state) => state.rootFolderId);
  const isShow = newFolderParentId !== rootFolderId;

  useEffect(() => {
    getFolders();
    getBasicFolders();
  }, [getBasicFolders, getFolders]);

  return (
    <HorizontalResizableContainer>
      <div className={treeLayout}>
        <FolderTreeHeader />
        {isShow && (
          <ShowCreateFolderInputButton newFolderParentId={rootFolderId} />
        )}

        <TreeNode id={rootFolderId} depth={0} />
      </div>
    </HorizontalResizableContainer>
  );
}
