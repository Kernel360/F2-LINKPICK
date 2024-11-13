'use client';

import { DragOverlay as DndKitDragOverlay } from '@dnd-kit/core';
import { usePickStore, useTreeStore } from '@/stores';
import { pickDragOverlayStyle, scaledDownStyle } from './dragOverlay.css';
import { PickCard } from './PickListViewer/PickCard';

export function DargOverlay() {
  const { isDragging: isFolderDragging, draggingFolderInfo } = useTreeStore();
  const { isDragging: isPickDragging, draggingPickInfo } = usePickStore();

  if (isPickDragging && draggingPickInfo) {
    return (
      <DndKitDragOverlay>
        <div className={scaledDownStyle}>
          <PickCard pickInfo={draggingPickInfo}></PickCard>
        </div>
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

  return null;
}
