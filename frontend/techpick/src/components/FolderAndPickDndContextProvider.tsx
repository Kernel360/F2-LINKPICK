'use client';

import { ROUTES } from '@/constants/route';
import { useGetDndContextSensor } from '@/hooks/useGetDndContextSensor';
import { pointerWithinWithClosestCenter } from '@/utils/pointerWithinWithClosestCenter';
import { pointerWithin } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { DndMonitorContext } from './DndMonitorContext';
import { DargOverlay } from './DragOverlay/DragOverlay';

/**
 * @description pick과 folder에서 drag & drop을 이용할 시에 콘텐스트로 감싸줘야합니다.
 */
export function FolderAndPickDndContextProvider({
  children,
}: PropsWithChildren) {
  const [elementClickPosition, setElementClickPosition] = useState({
    x: 0,
    y: 0,
  });
  const { sensors } = useGetDndContextSensor({
    setElementClickPosition,
  });
  const pathname = usePathname();
  const collisionDetectionAlgorithm = pathname.includes(ROUTES.RECOMMEND)
    ? pointerWithin
    : pointerWithinWithClosestCenter;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionAlgorithm}
    >
      <DndMonitorContext>{children}</DndMonitorContext>
      <DargOverlay elementClickPosition={elementClickPosition} />
    </DndContext>
  );
}
