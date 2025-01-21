'use client';

import { folderTreeHeaderTitleLayout } from '@/components/FolderTree/folderTreeHeader.css';
import { useFetchBasicFolders } from '@/queries/useFetchBasicFolders';
import { useFetchFolders } from '@/queries/useFetchFolders';
import { useCreateFolderInputStore } from '@/stores/createFolderInputStore';
import { ActiveNavigationItemIdProvider } from './ActiveNavigationItemIdProvider';
import { FolderTreeHeader } from './FolderTreeHeader';
import { HorizontalResizableContainer } from './HorizontalResizableContainer';
import { MyPageLinkItem } from './MyPagLinkItem';
import { SearchBar } from './SearchBar';
import { ShowCreateFolderInputButton } from './ShowCreateFolderInputButton';
import { TreeNode } from './TreeNode';
import { emptySpaceStyle, treeLayout, treeNodeLayoutStyle } from './tree.css';

export function FolderTree() {
  const { newFolderParentId } = useCreateFolderInputStore();
  useFetchFolders();
  const { data: basicFolders } = useFetchBasicFolders();
  const rootFolderId = basicFolders?.ROOT.id;
  const isCreateFolderMode = newFolderParentId !== rootFolderId;

  return (
    <HorizontalResizableContainer>
      <ActiveNavigationItemIdProvider>
        <div className={treeLayout}>
          <SearchBar />
          <FolderTreeHeader />

          <div className={folderTreeHeaderTitleLayout}>
            <h1>내 폴더</h1>
            {isCreateFolderMode && rootFolderId && (
              <ShowCreateFolderInputButton newFolderParentId={rootFolderId} />
            )}
          </div>

          <div className={treeNodeLayoutStyle}>
            {rootFolderId && <TreeNode id={rootFolderId} depth={0} />}
            <div className={emptySpaceStyle} />
          </div>
          <MyPageLinkItem />
        </div>
      </ActiveNavigationItemIdProvider>
    </HorizontalResizableContainer>
  );
}
