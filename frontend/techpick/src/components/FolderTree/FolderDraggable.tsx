'use client';

import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { CSSProperties, PropsWithChildren } from 'react';
import { activeDraggingFolderStyle } from './folderDraggable.css';

export const FolderDraggable = ({
  id,
  children,
}: PropsWithChildren<FolderDraggable>) => {
  const { selectedFolderList, isDragging } = useTreeStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isActiveDragging,
  } = useSortable({
    id: `folder-${id}`,
    data: {
      id: id,
      type: 'folder',
    },
  });
  const folderElementId = `folderId-${id}`;
  const isSelected = selectedFolderList.includes(id);
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: 1,
  };

  if (isSelected && isDragging && !isActiveDragging) {
    return null;
  }

  if (isActiveDragging && isDragging) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={activeDraggingFolderStyle}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      id={folderElementId}
    >
      {children}
    </div>
  );
};

interface FolderDraggable {
  id: number;
}
