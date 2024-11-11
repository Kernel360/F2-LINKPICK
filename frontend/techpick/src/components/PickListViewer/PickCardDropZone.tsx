'use client';

import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { usePickStore } from '@/stores/pickStore/pickStore';
import { PickViewDnDItemListLayoutComponentProps } from './DraggablePickListViewer';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

export function PickCardDropZone({
  folderId,
  children,
}: PickViewDnDItemListLayoutComponentProps) {
  const {
    getOrderedPickListByFolderId,
    movePick,
    selectedPickIdList,
    selectSinglePick,
  } = usePickStore();
  const orderedPickList = getOrderedPickListByFolderId(folderId);
  const orderedPickIdList = orderedPickList.map((pickInfo) => pickInfo.id);

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

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const pickId = Number(active.id);

    if (!selectedPickIdList.includes(pickId)) {
      selectSinglePick(pickId);

      return;
    }

    // console.log('onDragStart! active:', active);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return; // 드래그 중 놓은 위치가 없을 때 종료

    movePick({ folderId, from: active, to: over });

    // console.log('onDragEnd!');
    // console.log('active', active);
    // console.log('over', over);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext id={`${folderId}`} items={orderedPickIdList}>
        {children}
      </SortableContext>
    </DndContext>
  );
}
