'use client';

import { usePickStore } from '@/stores/pickStore/pickStore';
import type { PickViewDraggableItemListLayoutComponentProps } from '@/types/PickViewDraggableItemListLayoutComponentProps';
import {
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export function PickListSortableContextProvider({
  folderId,
  children,
  viewType,
}: PickViewDraggableItemListLayoutComponentProps) {
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
          orderedPickId === focusPickId,
      )
    : orderedPickIdList;

  /**
   * @description card일때와 vertical일 때(listItem, record) 렌더링이 다릅니다.
   */
  const strategy =
    viewType === 'record' ? verticalListSortingStrategy : rectSortingStrategy;

  return (
    <SortableContext
      id={`${folderId}`}
      items={orderedPickIdListWithoutSelectedIdList}
      strategy={strategy}
    >
      {children}
    </SortableContext>
  );
}
