'use client';

import { useFolderStore } from '@/stores/folderStore';
import type { FolderIdType } from '@/types/FolderIdType';
import { getFolderSortableContextId } from '@/utils/getFolderSortableContextId';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { CSSProperties, PropsWithChildren } from 'react';
import { activeDraggingFolderStyle } from './folderDraggable.css';

export const FolderDraggable = ({
  folderId,
  children,
}: PropsWithChildren<FolderDraggableProps>) => {
  const { isDragging } = useFolderStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isActiveDragging,
  } = useSortable({
    id: getFolderSortableContextId(folderId),
    data: {
      id: folderId,
      type: 'folder',
    },
  });
  const folderElementId = `folderId-${folderId}`;

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging && isActiveDragging) {
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
      style={style}
      {...attributes}
      {...listeners}
      id={folderElementId}
    >
      {children}
    </div>
  );
};

interface FolderDraggableProps {
  folderId: FolderIdType;
}
