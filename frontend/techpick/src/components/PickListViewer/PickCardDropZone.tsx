'use client';

import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { usePickStore } from '@/stores/pickStore/pickStore';
import { PickViewDnDItemListLayoutComponentProps } from './DraggablePickListViewer';
import { PickCard } from './PickCard';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

export function PickCardDropZone({
  folderId,
  children,
}: PickViewDnDItemListLayoutComponentProps) {
  const {
    getOrderedPickIdListByFolderId,
    getPickInfoByFolderIdAndPickId,
    movePicks,
    selectedPickIdList,
    selectSinglePick,
    setIsDragging,
    setFocusedPickId,
    isDragging,
    focusPickId,
  } = usePickStore();
  const orderedPickIdList = getOrderedPickIdListByFolderId(folderId);
  const orderedPickIdListWithoutSelectedIdList = isDragging
    ? orderedPickIdList.filter(
        (orderedPickId) =>
          !selectedPickIdList.includes(orderedPickId) ||
          orderedPickId === focusPickId
      )
    : orderedPickIdList;
  const draggingPickInfo = focusPickId
    ? getPickInfoByFolderIdAndPickId(folderId, focusPickId)
    : null;

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
    setIsDragging(true);
    const { active } = event;
    const pickId = Number(active.id);

    if (!selectedPickIdList.includes(pickId)) {
      selectSinglePick(pickId);
      return;
    }

    setFocusedPickId(pickId);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return; // 드래그 중 놓은 위치가 없을 때 종료

    movePicks({ folderId, from: active, to: over });
    setIsDragging(false);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        id={`${folderId}`}
        items={orderedPickIdListWithoutSelectedIdList}
        strategy={rectSortingStrategy}
      >
        {children}
      </SortableContext>
      {isDragging && draggingPickInfo && (
        <DragOverlay>
          <PickCard pickInfo={draggingPickInfo}></PickCard>
        </DragOverlay>
      )}
    </DndContext>
  );
}
