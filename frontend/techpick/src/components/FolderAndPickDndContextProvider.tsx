'use client';

import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useGetDndContextSensor } from '@/hooks';
import { pointerWithinWithClosestCenter } from '@/utils';
import { DndMonitorContext } from './DndMonitorContext';
import { DargOverlay } from './DragOverlay/DragOverlay';

// pointerWithinWithClosestCenter

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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithinWithClosestCenter}
    >
      <DndMonitorContext>{children}</DndMonitorContext>
      <DargOverlay elementClickPosition={elementClickPosition} />
    </DndContext>
  );
}
