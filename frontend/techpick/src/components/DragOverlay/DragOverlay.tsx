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
      <DndKitDragOverlay style={recommendPickOverlayStyle}>
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
