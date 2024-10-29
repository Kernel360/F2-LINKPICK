import type { CSSProperties, MouseEvent } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { hasIndex } from '@/utils';
import { draggableItem, draggingItem, selectedDragItemStyle } from './page.css';
import { isSelectionActive } from './sortableItem.util';

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

  const handleClick = (id: number, event: MouseEvent) => {
    if (event.shiftKey && isSelectionActive(selectedFolderList.length)) {
      // 부모 폴더가 다르면 무시
      if (
        treeDataMap[id].parentFolderId !==
        treeDataMap[selectedFolderList[0]].parentFolderId
      ) {
        setSelectedFolderList([id]);
        return;
      }

      const parentFolderInfo = treeDataMap[treeDataMap[id].parentFolderId];
      const lastSelectedIndex = parentFolderInfo.childFolderList.findIndex(
        (item) => selectedFolderList.includes(item)
      );
      const currentIndex = parentFolderInfo.childFolderList.findIndex(
        (item) => item === id
      );

      if (!hasIndex(lastSelectedIndex) || !hasIndex(currentIndex)) {
        return;
      }

      const start = Math.min(lastSelectedIndex, currentIndex);
      const end = Math.max(lastSelectedIndex, currentIndex);
      const newSelectedFolderList = parentFolderInfo.childFolderList
        .slice(start, end + 1)
        .map((item) => item);
      setSelectedFolderList(newSelectedFolderList);
    } else {
      setSelectedFolderList([id]);
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
