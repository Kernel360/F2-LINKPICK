'use client';

import { DragOverlay as DragOverlayPrimitive } from '@dnd-kit/core';
import { useGetDragOverStyle } from '@/hooks';
import {
  usePickStore,
  useDraggingRecommendPickStore,
  useTreeStore,
} from '@/stores';
import { dragCountStyle, stackedOverlayStyle } from './dragOverlay.css';
import { FolderItemOverlay } from './FolderItemOverlay';
import { PickCarouselCardOverlay } from './PickCarouselCardOverlay';
import { PickDragOverlayShadowList } from './PickDragOverlayShadowList';
import { PickRecordOverlay } from './PickRecordOverlay';

export function DargOverlay({ elementClickPosition }: DargOverlayProps) {
  const { isDragging: isFolderDragging, draggingFolderInfo } = useTreeStore();
  const {
    isDragging: isPickDragging,
    draggingPickInfo,
    selectedPickIdList,
  } = usePickStore();
  const { isDragging: isRecommendPickDragging, draggingRecommendPickInfo } =
    useDraggingRecommendPickStore();

  const { overlayStyle: pickOverlayStyle } = useGetDragOverStyle({
    elementClickPosition,
    isDragging: isPickDragging,
    scale: 0.7,
  });
  const { overlayStyle: folderOverlayStyle } = useGetDragOverStyle({
    elementClickPosition,
    isDragging: isFolderDragging,
  });
  const { overlayStyle: recommendPickOverlayStyle } = useGetDragOverStyle({
    elementClickPosition,
    isDragging: isRecommendPickDragging,
    scale: 0.4,
  });
  const selectedPickListCount = selectedPickIdList.length - 1;
  const shadowCount = Math.min(selectedPickListCount, 5);

  if (isPickDragging && draggingPickInfo) {
    return (
      <DragOverlayPrimitive style={pickOverlayStyle}>
        <div className={stackedOverlayStyle}>
          <PickRecordOverlay pickInfo={draggingPickInfo} />
          {0 < selectedPickListCount && (
            <>
              <PickDragOverlayShadowList count={shadowCount} />
              <div className={dragCountStyle}>{selectedPickIdList.length}</div>
            </>
          )}
        </div>
      </DragOverlayPrimitive>
    );
  }

  if (isFolderDragging && draggingFolderInfo) {
    return (
      <DragOverlayPrimitive style={folderOverlayStyle}>
        <FolderItemOverlay name={draggingFolderInfo.name} />
      </DragOverlayPrimitive>
    );
  }

  if (isRecommendPickDragging && draggingRecommendPickInfo) {
    return (
      <DragOverlayPrimitive style={recommendPickOverlayStyle}>
        <PickCarouselCardOverlay recommendPick={draggingRecommendPickInfo} />
      </DragOverlayPrimitive>
    );
  }
}

interface DargOverlayProps {
  elementClickPosition: {
    x: number;
    y: number;
  };
}
