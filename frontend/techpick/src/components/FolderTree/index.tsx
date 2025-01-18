'use client';

import { folderTreeHeaderTitleLayout } from '@/components/FolderTree/folderTreeHeader.css';
import { useCreateFolderInputStore } from '@/stores/createFolderInputStore';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { useEffect } from 'react';
import { FolderTreeHeader } from './FolderTreeHeader';
import { HorizontalResizableContainer } from './HorizontalResizableContainer';
import { MyPageLinkItem } from './MyPagLinkItem';
import { SearchBar } from './SearchBar';
import { ShowCreateFolderInputButton } from './ShowCreateFolderInputButton';
import { TreeNode } from './TreeNode';
import { emptySpaceStyle, treeLayout, treeNodeLayoutStyle } from './tree.css';

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
        <SearchBar />
        <FolderTreeHeader />

        <div className={folderTreeHeaderTitleLayout}>
          <h1>내 폴더</h1>
          {isCreateFolderMode && (
            <ShowCreateFolderInputButton newFolderParentId={rootFolderId} />
          )}
        </div>

        <div className={treeNodeLayoutStyle}>
          {<TreeNode id={rootFolderId} depth={0} />}
          <div className={emptySpaceStyle} />
        </div>
        <MyPageLinkItem />
      </div>
    </HorizontalResizableContainer>
  );
}
