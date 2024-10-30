import type { CSSProperties, PropsWithChildren } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';

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
    id,
    data: {
      id: `test ${id}`,
    },
  });

  const isSelected = selectedFolderList.includes(id);
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: 1,
  };

  if (isSelected && isDragging && !isActiveDragging) {
    return null;
  }

  if (isActiveDragging) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{ border: '1px solid black', ...style, width: '200px' }}
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        width: 'fit-content',
        height: 'fit-content',
        padding: '4px',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

interface FolderDraggable {
  id: number;
}
