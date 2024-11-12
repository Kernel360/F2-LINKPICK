'use client';

import type { PropsWithChildren } from 'react';
import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core';
import { useGetDndContextSensor } from '@/hooks';
import { DndMonitorContext } from './DndMonitorContext';

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
      <DragOverlay>
        {/** 나중에 뭘 드래그하냐에 따라 달라져야한다. */}
        <div
          style={{ width: '200px', height: '50px', border: '1px solid black' }}
        ></div>
      </DragOverlay>
    </DndContext>
  );
}

/**
 * @description PickCardDropZone Overlay
 */
// {isDragging && draggingPickInfo && (
//   <DragOverlay>
//     <PickCard pickInfo={draggingPickInfo}></PickCard>
//   </DragOverlay>
// )}

/**
 * @description FolderTreeDragOverlay
 */
{
  /* <DragOverlay>

<div className={`${dragOverStyle}`}>Drag 한 폴더의 이름</div>
</DragOverlay> */
}
