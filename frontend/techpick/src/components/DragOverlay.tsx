'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { DragOverlay as DndKitDragOverlay } from '@dnd-kit/core';
import { usePickStore, useTreeStore } from '@/stores';
import { pickDragOverlayStyle } from './dragOverlay.css';
import { PickRecord } from './PickRecord';

export function DargOverlay({ elementClickPosition }: DargOverlayProps) {
  const { isDragging: isFolderDragging, draggingFolderInfo } = useTreeStore();
  const { isDragging: isPickDragging, draggingPickInfo } = usePickStore();
  const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });
  const overlayStyle: CSSProperties = {
    top: `${mousePosition.y}px`,
    left: `${mousePosition.x}px`,
    transform: 'translate3d(0, 0, 0)', // translate3d를 none으로 설정
    pointerEvents: 'none', // 오버레이가 마우스 이벤트를 방해하지 않도록 설정
  };

  useEffect(
    function trackingMousePointer() {
      const handleMouseMove = (event: MouseEvent | TouchEvent) => {
        if (!(isPickDragging || isFolderDragging)) {
          return;
        }

        const clientX =
          event instanceof MouseEvent
            ? event.clientX
            : event.touches[0].clientX;
        const clientY =
          event instanceof MouseEvent
            ? event.clientY
            : event.touches[0].clientY;

        if (isPickDragging) {
          setMousePosition({
            x: clientX - elementClickPosition.x,
            y: clientY - elementClickPosition.y,
          });

          return;
        }

        if (isFolderDragging) {
          setMousePosition({
            x: clientX - elementClickPosition.x,
            y: clientY - elementClickPosition.y,
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleMouseMove);
      };
    },
    [
      elementClickPosition.x,
      elementClickPosition.y,
      isFolderDragging,
      isPickDragging,
    ]
  );

  if (mousePosition.x === -1 && mousePosition.y === -1) {
    return;
  }

  if (isPickDragging && draggingPickInfo) {
    return (
      <DndKitDragOverlay style={overlayStyle}>
        <div>
          <PickRecord pickInfo={draggingPickInfo}></PickRecord>
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
