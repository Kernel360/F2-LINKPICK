'use client';

import { MouseEvent, type CSSProperties } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { usePickStore, useUpdatePickStore } from '@/stores';
import { isSelectionActive } from '@/utils';
import {
  isActiveDraggingItemStyle,
  selectedDragItemStyle,
} from './pickDnDCard.css';
import { getSelectedPickRange } from './pickDnDCard.util';
import { PickListItem } from './PickListItem';
import type { PickViewDnDItemComponentProps } from './PickListViewer';

export function PickDndListItem({ pickInfo }: PickViewDnDItemComponentProps) {
  const {
    selectedPickIdList,
    selectSinglePick,
    getOrderedPickIdListByFolderId,
    focusPickId,
    setSelectedPickIdList,
    isDragging,
  } = usePickStore();
  const { setCurrentUpdateTitlePickIdToNull } = useUpdatePickStore();
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
  });
  const pickElementId = `pickId-${pickId}`;

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

  if (isDragging && isSelected && !isActiveDragging) {
    return null;
  }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div
        className={`${isSelected ? selectedDragItemStyle : ''} ${isActiveDragging ? isActiveDraggingItemStyle : ''}`}
        onClick={(event) => handleClick(pickId, event)}
        id={pickElementId}
      >
        <PickListItem pickInfo={pickInfo} />
      </div>
    </div>
  );
}
