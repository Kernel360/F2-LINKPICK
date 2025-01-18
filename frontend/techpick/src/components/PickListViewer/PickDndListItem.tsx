'use client';

import { usePickStore } from '@/stores/pickStore/pickStore';
import { useUpdatePickStore } from '@/stores/updatePickStore';
import { isSelectionActive } from '@/utils/isSelectionActive';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { CSSProperties, MouseEvent } from 'react';
import { PickListItem } from './PickListItem';
import type { PickViewDnDItemComponentProps } from './PickListViewer';
import {
  isActiveDraggingItemStyle,
  selectedDragItemStyle,
} from './pickDnDCard.css';
import { getSelectedPickRange } from './pickDnDCard.util';

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
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
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
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
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
