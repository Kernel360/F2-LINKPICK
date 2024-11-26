'use client';

import { DragOverlay as DndKitDragOverlay } from '@dnd-kit/core';
import { useGetDragOverStyle } from '@/hooks';
import { usePickStore, useTreeStore } from '@/stores';
import {
  dragCount,
  pickDragOverlayStyle,
  stackedItem,
  stackedOverlay,
} from './dragOverlay.css';
import { PickRecordOverlay } from './PickRecord/PickRecordOverlay';

export function DargOverlay({ elementClickPosition }: DargOverlayProps) {
  const { isDragging: isFolderDragging, draggingFolderInfo } = useTreeStore();
  const {
    isDragging: isPickDragging,
    draggingPickInfo,
    selectedPickIdList,
  } = usePickStore();
  const { overlayStyle } = useGetDragOverStyle({ elementClickPosition });

  if (isPickDragging && draggingPickInfo) {
    const shadowElements = Array.from(
      { length: selectedPickIdList.length - 1 },
      (_, index) => (
        <div
          key={index}
          className={stackedItem}
          style={{
            transform: `translate(${(index + 1) * 4}px, ${(index + 1) * 4}px)`,
            opacity: 0.8,
            zIndex: -index - 1,
          }}
        />
      )
    );

    return (
      <DndKitDragOverlay style={overlayStyle}>
        <div className={stackedOverlay}>
          <PickRecordOverlay pickInfo={draggingPickInfo} />
          {shadowElements}
          <div className={dragCount}>{selectedPickIdList.length}</div>
        </div>
      </DndKitDragOverlay>
    );
  }

  if (isFolderDragging && draggingFolderInfo) {
    return (
      <DndKitDragOverlay style={overlayStyle}>
        <div className={`${pickDragOverlayStyle}`}>
          {draggingFolderInfo.name}
        </div>
      </DndKitDragOverlay>
    );
  }

  return null;
}

interface DargOverlayProps {
  elementClickPosition: {
    x: number;
    y: number;
  };
}
