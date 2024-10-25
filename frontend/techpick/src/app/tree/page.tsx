'use client';

import { useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { mockFolders } from '@/constants/treeMockDate';
import { useTreeStore } from '@/stores/dndTreeStore';
import {
  dragContainer,
  draggableItem,
  draggingItem,
  treePageWrapper,
} from './page.css';
import type { DragEndEvent } from '@dnd-kit/core';

function SortableItem({ id, name }: { id: number; name: string }) {
  const { selectedItems } = useTreeStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const isSelected = selectedItems.includes(id);

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
  const { treeDataList, replaceTreeData } = useTreeStore();

  useEffect(() => {
    replaceTreeData(mockFolders);
  }, [replaceTreeData]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return; // 드래그 중 놓은 위치가 없을 때 종료

    console.log('active', active);
    console.log('over', over);

    const oldIndex = treeDataList.findIndex((item) => item.id === active.id);
    const newIndex = treeDataList.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newOrder = arrayMove(treeDataList, oldIndex, newIndex);
      replaceTreeData(newOrder); // 새로운 순서로 트리 데이터 업데이트
    }
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
