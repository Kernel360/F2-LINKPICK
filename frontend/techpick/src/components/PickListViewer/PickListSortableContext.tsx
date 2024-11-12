'use client';

import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { usePickStore } from '@/stores/pickStore/pickStore';
import { PickViewDnDItemListLayoutComponentProps } from './DraggablePickListViewer';

export function PickListSortableContext({
  folderId,
  children,
}: PickViewDnDItemListLayoutComponentProps) {
  const {
    getOrderedPickIdListByFolderId,
    selectedPickIdList,
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

  return (
    <SortableContext
      id={`${folderId}`}
      items={orderedPickIdListWithoutSelectedIdList}
      strategy={rectSortingStrategy}
    >
      {children}
    </SortableContext>
  );
}
