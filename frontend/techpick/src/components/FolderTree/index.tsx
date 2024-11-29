'use client';

import { useEffect } from 'react';
import { folderTreeHeaderTitleLayout } from '@/components/FolderTree/folderTreeHeader.css';
import { useCreateFolderInputStore } from '@/stores/createFolderInputStore';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { FolderTreeHeader } from './FolderTreeHeader';
import { HorizontalResizableContainer } from './HorizontalResizableContainer';
import { ShowCreateFolderInputButton } from './ShowCreateFolderInputButton';
import { treeLayout, treeNodeLayoutStyle } from './tree.css';
import { TreeNode } from './TreeNode';
import { UserMenuBar } from './UserMenuBar';

export function FolderTree() {
  const { newFolderParentId } = useCreateFolderInputStore();
  const { getFolders, getBasicFolders } = useTreeStore();
  const rootFolderId = useTreeStore((state) => state.rootFolderId);
  const isCreateFolderMode = newFolderParentId !== rootFolderId;

  useEffect(() => {
    getFolders();
    getBasicFolders();
  }, [getBasicFolders, getFolders]);

  return (
    <HorizontalResizableContainer>
      <div className={treeLayout}>
        <UserMenuBar />
        <FolderTreeHeader />

        <div className={folderTreeHeaderTitleLayout}>
          <h1>내 폴더</h1>
          {isCreateFolderMode && (
            <ShowCreateFolderInputButton newFolderParentId={rootFolderId} />
          )}
        </div>
        <div className={treeNodeLayoutStyle}>
          {<TreeNode id={rootFolderId} depth={0} />}
        </div>
      </div>
    </HorizontalResizableContainer>
  );
}
