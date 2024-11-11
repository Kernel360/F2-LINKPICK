'use client';

import { useEffect } from 'react';
import { DragOverlay } from '@dnd-kit/core';
import { useCreateFolderInputStore } from '@/stores/createFolderInputStore';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { FolderDropZone } from './FolderDropZone';
import { FolderTreeHeader } from './FolderTreeHeader';
import { HorizontalResizableContainer } from './HorizontalResizableContainer';
import { ShowCreateFolderInputButton } from './ShowCreateFolderInputButton';
import { dragOverStyle, treeLayout } from './tree.css';
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
        <FolderDropZone>
          <TreeNode id={rootFolderId} depth={0} />
          <DragOverlay>
            {/** 추후에 data를 정확한 타입을 넣을 수 있을 때 추가할 예정. */}
            <div className={`${dragOverStyle}`}>Drag 한 폴더의 이름</div>
          </DragOverlay>
        </FolderDropZone>
      </div>
    </HorizontalResizableContainer>
  );
}
