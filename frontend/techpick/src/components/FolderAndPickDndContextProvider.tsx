'use client';

import type { PropsWithChildren } from 'react';
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
} from '@dnd-kit/core';
import { DndMonitorContext } from './DndMonitorContext';

/**
 * @description pick과 folder에서 drag & drop을 이용할 시에 콘텐스트로 감싸줘야합니다.
 */
export function FolderAndPickDndContextProvider({
  children,
}: PropsWithChildren) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // MouseSensor: 10px 이동해야 드래그 시작
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

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
