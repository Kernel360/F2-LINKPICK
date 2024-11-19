'use client';

import { MouseEvent, useCallback, type CSSProperties } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { usePickStore } from '@/stores';
import { isSelectionActive } from '@/utils';
import {
  isActiveDraggingItemStyle,
  selectedDragItemStyle,
} from './pickDnDCard.css';
import { getSelectedPickRange } from './pickDnDCard.util';
import { PickRecord } from './PickRecord';
import type { PickViewDnDItemComponentProps } from './PickListViewer';

export function PickDndRecord({ pickInfo }: PickViewDnDItemComponentProps) {
  const {
    selectedPickIdList,
    selectSinglePick,
    getOrderedPickIdListByFolderId,
    focusPickId,
    setSelectedPickIdList,
    isDragging,
  } = usePickStore();
  const { linkInfo, id: pickId, parentFolderId } = pickInfo;
  const { url } = linkInfo;
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

  const openUrl = useCallback(() => {
    window.open(url, '_blank');
  }, [url]);

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

    selectSinglePick(pickId);
  };

  if (isDragging && isSelected && !isActiveDragging) {
    return null;
  }

  return (
    <>
      <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
        <div
          className={`${isSelected ? selectedDragItemStyle : ''} ${isActiveDragging ? isActiveDraggingItemStyle : ''}`}
          onDoubleClick={openUrl}
          onClick={(event) => handleClick(pickId, event)}
          id={pickElementId}
        >
          <PickRecord pickInfo={pickInfo} />
        </div>
      </div>
    </>
  );
}
