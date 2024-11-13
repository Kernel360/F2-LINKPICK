'use client';

import { DragOverlay as DndKitDragOverlay } from '@dnd-kit/core';
import { usePickStore, useTreeStore } from '@/stores';
import { PickCard } from './PickListViewer/PickCard';

export function DargOverlay() {
  const { isDragging: isFolderDragging } = useTreeStore();
  const { isDragging: isPickDragging, draggingPickInfo } = usePickStore();

  if (isPickDragging && draggingPickInfo) {
    return (
      <DndKitDragOverlay>
        <PickCard pickInfo={draggingPickInfo}></PickCard>
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
