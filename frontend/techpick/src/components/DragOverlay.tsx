'use client';

import { DragOverlay as DndKitDragOverlay } from '@dnd-kit/core';
import { useGetDragOverStyle } from '@/hooks';
import { usePickStore, useTreeStore } from '@/stores';
import {
  dragCount,
  pickDragOverlayStyle,
  stackedOverlay,
} from './dragOverlay.css';
import { PickDragOverlayShadowList } from './PickDragOverlayShadowList';
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
    return (
      <DndKitDragOverlay style={overlayStyle}>
        <div className={stackedOverlay}>
          <PickRecordOverlay pickInfo={draggingPickInfo} />
          <PickDragOverlayShadowList count={selectedPickIdList.length} />
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
