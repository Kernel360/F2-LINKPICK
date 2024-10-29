'use client';

import { useEffect } from 'react';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { mockFolders } from '@/stores/dndTreeStore/treeMockDate';
import { isDnDCurrentData } from '@/stores/dndTreeStore/utils/isDnDCurrentData';
import { dragContainer, draggableItem, treePageWrapper } from './page.css';
import { SortableItem } from './SortableItem';
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';

export default function TreePage() {
  const {
    setTreeMap,
    moveFolder,
    selectedFolderList,
    setSelectedFolderList,
    setIsDragging,
    filterByParentId,
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

  useEffect(
    function onTreePageLoad() {
      setTreeMap(mockFolders);
    },
    [setTreeMap]
  );

  const rootFolderChildList = filterByParentId(-1);
  const depth1ChildList = filterByParentId(1);

  return (
    <div>
      <h1>hi, this is tree page</h1>
      <div className={treePageWrapper}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
        >
          <div style={{ display: 'flex', gap: '140px' }}>
            <div>
              <SortableContext
                id="-1"
                items={rootFolderChildList.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <ul className={dragContainer}>
                  {rootFolderChildList.map((treeData) => (
                    <SortableItem
                      key={treeData.id}
                      id={treeData.id}
                      name={treeData.name}
                    />
                  ))}
                </ul>
              </SortableContext>
            </div>

            <div>
              <SortableContext
                id="1"
                items={depth1ChildList.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <ul className={dragContainer}>
                  {depth1ChildList.map((treeData) => (
                    <SortableItem
                      key={treeData.id}
                      id={treeData.id}
                      name={treeData.name}
                    />
                  ))}
                </ul>
              </SortableContext>
            </div>
          </div>

          <DragOverlay>
            {/** 추후에 data를 정확한 타입을 넣을 수 있을 때 추가할 예정. */}
            <div className={`${draggableItem}`}>Drag 한 폴더의 이름</div>
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
