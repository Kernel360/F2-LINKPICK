'use client';

import type { PropsWithChildren } from 'react';
import { DndContext, pointerWithin } from '@dnd-kit/core';
import { useGetDndContextSensor } from '@/hooks';
import { DndMonitorContext } from './DndMonitorContext';
import { DargOverlay } from './DragOverlay';

/**
 * @description pick과 folder에서 drag & drop을 이용할 시에 콘텐스트로 감싸줘야합니다.
 */
export function FolderAndPickDndContextProvider({
  children,
}: PropsWithChildren) {
  const { sensors } = useGetDndContextSensor();

  return (
    <DndContext sensors={sensors} collisionDetection={pointerWithin}>
      <DndMonitorContext>{children}</DndMonitorContext>
      <DargOverlay />
    </DndContext>
  );
}

/**
 * @description FolderTreeDragOverlay
 */
{
  /* <DragOverlay>

<div className={`${dragOverStyle}`}>Drag 한 폴더의 이름</div>
</DragOverlay> */
}
