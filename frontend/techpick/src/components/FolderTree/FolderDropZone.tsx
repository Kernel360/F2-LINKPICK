import type { PropsWithChildren } from 'react';
import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { isDnDCurrentData } from '@/stores/dndTreeStore/utils/isDnDCurrentData';
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';

export function FolderDropZone({ children }: PropsWithChildren) {
  const {
    moveFolder,
    selectedFolderList,
    setSelectedFolderList,
    setIsDragging,
  } = useTreeStore();
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

    if (!selectedFolderList.includes(Number(active.id))) {
      setSelectedFolderList([Number(event.active.id)]);
      return;
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    console.log('active over');
    console.log('active', active);
    console.log('over', over);

    if (!isDnDCurrentData(activeData) || !isDnDCurrentData(overData)) {
      return;
    }

    // 같은 부모 containerId를 가지면 동작하지 않음.
    if (activeData.sortable.containerId === overData.sortable.containerId) {
      return;
    }

    moveFolder({
      from: active,
      to: over,
      selectedFolderList,
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return; // 드래그 중 놓은 위치가 없을 때 종료

    moveFolder({
      from: active,
      to: over,
      selectedFolderList,
    });
    setIsDragging(false);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
    >
      {children}
    </DndContext>
  );
}
