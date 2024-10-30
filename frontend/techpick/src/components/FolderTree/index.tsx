import { useEffect } from 'react';
import { DragOverlay } from '@dnd-kit/core';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { mockFolders } from '@/stores/dndTreeStore/treeMockDate';
import { FolderDropZone } from './FolderDropZone';
import { dragOverStyle, treeLayout } from './tree.css';
import { TreeNode } from './TreeNode';

export function FolderTree() {
  const { setTreeMap } = useTreeStore();

  useEffect(
    function onTreePageLoad() {
      setTreeMap(mockFolders);
    },
    [setTreeMap]
  );

  return (
    <div className={treeLayout}>
      <FolderDropZone>
        <TreeNode id={-1} depth={0} />
        <DragOverlay>
          {/** 추후에 data를 정확한 타입을 넣을 수 있을 때 추가할 예정. */}
          <div className={`${dragOverStyle}`}>Drag 한 폴더의 이름</div>
        </DragOverlay>
      </FolderDropZone>
    </div>
  );
}
