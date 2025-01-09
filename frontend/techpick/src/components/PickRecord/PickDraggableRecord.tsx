'use client';

import type { CSSProperties, MouseEvent } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useSearchElementId from '@/hooks/useSearchElementId';
import { usePickStore, useUpdatePickStore } from '@/stores';
import { getSelectedPickRange, isSelectionActive } from '@/utils';
import { PickContextMenu } from './PickContextMenu';
import {
  isActiveDraggingItemStyle,
  selectedDragItemStyle,
  searchedItemStyle,
} from './pickDraggableRecord.css';
import { PickRecord } from './PickRecord';
import { PickViewDraggableItemComponentProps } from '@/types';

export function PickDraggableRecord({
  pickInfo,
}: PickViewDraggableItemComponentProps) {
  const {
    selectedPickIdList,
    selectSinglePick,
    getOrderedPickIdListByFolderId,
    focusPickId,
    setSelectedPickIdList,
    isDragging,
  } = usePickStore();
  const {
    setCurrentUpdateTitlePickIdToNull,
    currentUpdateTitlePickId,
    currentUpdateTagPickId,
  } = useUpdatePickStore();
  const { searchElementId, isOccurClickEvent } = useSearchElementId();
  const { id: pickId, parentFolderId } = pickInfo;
  const isSelected = selectedPickIdList.includes(pickId);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isActiveDragging,
  } = useSortable({
    id: pickId,
    data: {
      id: pickId,
      type: 'pick',
      parentFolderId: parentFolderId,
    },
    disabled:
      currentUpdateTitlePickId === pickInfo.id ||
      currentUpdateTagPickId === pickInfo.id,
  });
  const pickElementId = `pickId-${pickId}`;
  const isSearchedPickHighlight =
    searchElementId === pickElementId && !isOccurClickEvent;

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: 1,
  };

  const handleShiftSelect = (parentFolderId: number, pickId: number) => {
    if (!focusPickId) {
      return;
    }

    // 새로운 선택된 배열 만들기.
    const orderedPickIdList = getOrderedPickIdListByFolderId(parentFolderId);

    const newSelectedPickIdList = getSelectedPickRange({
      orderedPickIdList,
      startPickId: focusPickId,
      endPickId: pickId,
    });

    setSelectedPickIdList(newSelectedPickIdList);
  };

  const handleClick = (
    pickId: number,
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    if (event.shiftKey && isSelectionActive(selectedPickIdList.length)) {
      event.preventDefault();
      handleShiftSelect(parentFolderId, pickId);
      return;
    }

    setCurrentUpdateTitlePickIdToNull();
    selectSinglePick(pickId);
  };

  /**
   * @description multi-select에 포함이 됐으나 dragging target이 아닐때.
   */
  if (isDragging && isSelected && !isActiveDragging) {
    return null;
  }

  return (
    <div
      className={`${isSearchedPickHighlight ? searchedItemStyle : ''}`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ width: 'fit-content', ...style }}
      data-pick-draggable={true} // 해당 data는 focus를 바꾸는 동작과 연관이 있습니다.
    >
      <div
        className={`${isSelected ? selectedDragItemStyle : ''} ${isActiveDragging ? isActiveDraggingItemStyle : ''}`}
        onClick={(event) => handleClick(pickId, event)}
        id={pickElementId}
      >
        <PickContextMenu pickInfo={pickInfo}>
          <PickRecord pickInfo={pickInfo} />
        </PickContextMenu>
      </div>
    </div>
  );
}
