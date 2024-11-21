'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { folderTreeHeaderTitleLayout } from '@/components/FolderTree/folderTreeHeader.css';
import { useCreateFolderInputStore } from '@/stores/createFolderInputStore';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { isCurrentPathRootOrGeneral } from '@/utils/isCurrentPathRootOrGeneral';
import { FolderTreeHeader } from './FolderTreeHeader';
import { HorizontalResizableContainer } from './HorizontalResizableContainer';
import { ShowCreateFolderInputButton } from './ShowCreateFolderInputButton';
import { treeLayout } from './tree.css';
import { TreeNode } from './TreeNode';

export function FolderTree() {
  const pathname = usePathname();
  const { newFolderParentId } = useCreateFolderInputStore();
  const { getFolders, getBasicFolders } = useTreeStore();
  const rootFolderId = useTreeStore((state) => state.rootFolderId);
  const isCreateFolderMode = newFolderParentId !== rootFolderId;

  useEffect(() => {
    getFolders();
    getBasicFolders();
  }, [getBasicFolders, getFolders]);

  const showChildFolderTree = isCurrentPathRootOrGeneral(pathname);

  return (
    <HorizontalResizableContainer>
      <div className={treeLayout}>
        <FolderTreeHeader />
        <div className={folderTreeHeaderTitleLayout}>
          {/* TODO: 컴포넌트로 빼기 */}
          <h1>폴더</h1>
          {showChildFolderTree && isCreateFolderMode && (
            <ShowCreateFolderInputButton newFolderParentId={rootFolderId} />
          )}
        </div>
        {showChildFolderTree && <TreeNode id={rootFolderId} depth={0} />}
      </div>
    </HorizontalResizableContainer>
  );
}
