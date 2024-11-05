'use client';

import { DragOverlay } from '@dnd-kit/core';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { FolderDropZone } from './FolderDropZone';
import { FolderTreeHeader } from './FolderTreeHeader';
import { HorizontalResizableContainer } from './HorizontalResizableContainer';
import { dragOverStyle, treeLayout } from './tree.css';
import { TreeNode } from './TreeNode';

export function FolderTree() {
  const rootFolderId = useTreeStore((state) => state.rootFolderId);

  return (
    <HorizontalResizableContainer>
      <div className={treeLayout}>
        <FolderTreeHeader />
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
