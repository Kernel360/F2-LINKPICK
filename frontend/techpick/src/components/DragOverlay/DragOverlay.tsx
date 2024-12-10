'use client';

import { DragOverlay as DndKitDragOverlay } from '@dnd-kit/core';
import { useGetDragOverStyle } from '@/hooks';
import {
  usePickStore,
  useDraggingRecommendPickStore,
  useTreeStore,
} from '@/stores';
import { dragCountStyle, stackedOverlayStyle } from './dragOverlay.css';
import { FolderItemOverlay } from './FolderItemOverlay';
import { PickDragOverlayShadowList } from './PickDragOverlayShadowList';
import { PickRecordOverlay } from './PickRecordOverlay';
import { PickCarouselCard } from '../RecommendedPickCarousel/PickCarouselCard';

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
  });
  const { overlayStyle: folderOverlayStyle } = useGetDragOverStyle({
    elementClickPosition,
    scale: 1,
  });
  const selectedPickListCount = selectedPickIdList.length - 1;

  if (isPickDragging && draggingPickInfo) {
    return (
      <DndKitDragOverlay style={pickOverlayStyle}>
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
      <DndKitDragOverlay style={folderOverlayStyle}>
        <FolderItemOverlay name={draggingFolderInfo.name} />
      </DndKitDragOverlay>
    );
  }

  if (isRecommendPickDragging && draggingRecommendPickInfo) {
    return (
      <DndKitDragOverlay>
        <PickCarouselCard recommendPick={draggingRecommendPickInfo} />
      </DndKitDragOverlay>
    );
  }
}

interface DargOverlayProps {
  elementClickPosition: {
    x: number;
    y: number;
  };
}
