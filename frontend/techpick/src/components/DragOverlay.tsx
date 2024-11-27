'use client';

import { DragOverlay as DndKitDragOverlay } from '@dnd-kit/core';
import { useGetDragOverStyle } from '@/hooks';
import { usePickStore, useTreeStore } from '@/stores';
import {
  dragCountStyle,
  pickDragOverlayStyle,
  stackedOverlayStyle,
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
  const selectedPickListCount = selectedPickIdList.length - 1;

  if (isPickDragging && draggingPickInfo) {
    return (
      <DndKitDragOverlay style={overlayStyle}>
        <div className={stackedOverlayStyle}>
          <PickRecordOverlay pickInfo={draggingPickInfo} />
          {0 < selectedPickListCount && (
            <>
              <PickDragOverlayShadowList count={selectedPickListCount} />
              <div className={dragCountStyle}>{selectedPickIdList.length}</div>
            </>
          )}
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
