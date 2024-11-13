'use client';

import { DragOverlay as DndKitDragOverlay } from '@dnd-kit/core';
import { usePickStore, useTreeStore } from '@/stores';
import { pickDragOverlayStyle } from './dragOverlay.css';
import { PickCard } from './PickListViewer/PickCard';

export function DargOverlay() {
  const { isDragging: isFolderDragging, draggingFolderInfo } = useTreeStore();
  const { isDragging: isPickDragging, draggingPickInfo } = usePickStore();

  if (isPickDragging && draggingPickInfo) {
    return (
      <DndKitDragOverlay>
        <PickCard pickInfo={draggingPickInfo}></PickCard>
      </DndKitDragOverlay>
    );
  }

  if (isFolderDragging && draggingFolderInfo) {
    return (
      <DndKitDragOverlay>
        <div className={`${pickDragOverlayStyle}`}>
          {draggingFolderInfo.name}
        </div>
      </DndKitDragOverlay>
    );
  }

  return (
    <DndKitDragOverlay>
      <div
        style={{ width: '200px', height: '50px', border: '1px solid black' }}
      >
        {isFolderDragging ? 'folder' : null}
      </div>
    </DndKitDragOverlay>
  );
}
