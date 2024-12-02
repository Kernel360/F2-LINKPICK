'use client';

import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { DndContext, pointerWithin } from '@dnd-kit/core';
import { useGetDndContextSensor } from '@/hooks';
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

  return (
    <DndContext sensors={sensors} collisionDetection={pointerWithin}>
      <DndMonitorContext>{children}</DndMonitorContext>
      <DargOverlay elementClickPosition={elementClickPosition} />
    </DndContext>
  );
}
