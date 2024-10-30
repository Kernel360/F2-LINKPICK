import type { CSSProperties, MouseEvent } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { draggableItem, draggingItem, selectedDragItemStyle } from './page.css';
import {
  getSelectedFolderRange,
  isSameParentFolder,
  isSelectionActive,
} from './sortableItem.util';
import type { FolderMapType } from '@/types';

export function SortableItem({ id, name }: { id: number; name: string }) {
  const { treeDataMap, selectedFolderList, setSelectedFolderList, isDragging } =
    useTreeStore();
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

  const selectSingleFolder = (id: number) => {
    setSelectedFolderList([id]);
  };

  const handleShiftSelect = (
    id: number,
    selectedList: number[],
    treeDataMap: FolderMapType
  ) => {
    if (!isSameParentFolder(id, selectedList[0], treeDataMap)) {
      selectSingleFolder(id);
      return;
    }

    const newSelectedList = getSelectedFolderRange(
      id,
      selectedList,
      treeDataMap
    );
    setSelectedFolderList(newSelectedList);
  };

  const handleClick = (id: number, event: MouseEvent) => {
    if (event.shiftKey && isSelectionActive(selectedFolderList.length)) {
      handleShiftSelect(id, selectedFolderList, treeDataMap);
    } else {
      selectSingleFolder(id);
    }
  };

  if (isSelected && isDragging && !isActiveDragging) {
    return null;
  }

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`${draggableItem} ${isDragging ? draggingItem : ''} ${isSelected ? selectedDragItemStyle : ''}`}
      style={style}
      onClick={(event) => handleClick(id, event)}
    >
      {name}
    </li>
  );
}
