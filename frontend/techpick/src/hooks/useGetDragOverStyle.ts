import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { usePickStore, useTreeStore } from '@/stores';

export function useGetDragOverStyle({
  elementClickPosition,
  scale = 0.7,
}: UseGetDragOverStyleProps) {
  const { isDragging: isFolderDragging } = useTreeStore();
  const { isDragging: isPickDragging } = usePickStore();
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const overlayStyle: CSSProperties = mousePosition
    ? {
        top: `${mousePosition.y}px`,
        left: `${mousePosition.x}px`,
        transformOrigin: 'top left',
        transform: `scale(${scale}) translate3d(0, 0, 0)`,
        pointerEvents: 'none',
      }
    : {
        visibility: 'hidden', // Hide the overlay until we have a valid position
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

        const adjustedX = clientX - elementClickPosition.x * scale; // 스케일 적용
        const adjustedY = clientY - elementClickPosition.y * scale; // 스케일 적용

        if (isPickDragging) {
          setMousePosition({
            x: adjustedX,
            y: adjustedY,
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
      scale,
    ]
  );

  useEffect(() => {
    if (!isFolderDragging && !isPickDragging) {
      setMousePosition(null);
    }
  }, [isFolderDragging, isPickDragging]);

  return { overlayStyle };
}

interface UseGetDragOverStyleProps {
  elementClickPosition: {
    x: number;
    y: number;
  };
  scale?: number;
}
