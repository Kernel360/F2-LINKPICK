'use client';

import { useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { mockFolders } from '@/stores/dndTreeStore/treeMockDate';
import {
  dragContainer,
  draggableItem,
  draggingItem,
  treePageWrapper,
} from './page.css';
import type { DragEndEvent } from '@dnd-kit/core';

function SortableItem({ id, name }: { id: number; name: string }) {
  const { selectedFolderList } = useTreeStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      id: `test ${id}`,
    },
  });

  const isSelected = selectedFolderList.includes(id);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isSelected ? '#cce4ff' : '#fff',
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`${draggableItem} ${isDragging ? draggingItem : ''}`}
      style={style}
    >
      {name}
    </li>
  );
}

export default function TreePage() {
  const { treeDataList, setTreeData, moveFolder } = useTreeStore();

  useEffect(() => {
    setTreeData(mockFolders);
  }, [setTreeData]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return; // 드래그 중 놓은 위치가 없을 때 종료

    moveFolder({
      from: active,
      to: over,
      selectedFolderList: [Number(active.id)],
    });
  };

  return (
    <div className={treePageWrapper}>
      <h1>hi, this is tree page</h1>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={treeDataList.map((item) => item.id)}>
          <ul className={dragContainer}>
            {treeDataList.map((treeData) => (
              <SortableItem
                key={treeData.id}
                id={treeData.id}
                name={treeData.name}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}
