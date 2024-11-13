'use client';

import { useCallback } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { usePickStore } from '@/stores/pickStore/pickStore';
import { isSelectionActive } from '@/utils';
import {
  cardDescriptionSectionStyle,
  cardImageSectionStyle,
  cardImageStyle,
  cardTitleSectionStyle,
  defaultCardImageSectionStyle,
  pickCardLayout,
} from './pickCard.css';
import {
  selectedDragItemStyle,
  isActiveDraggingItemStyle,
} from './pickDnDCard.css';
import { getSelectedPickRange } from './pickDnDCard.util';
import { PickViewDnDItemComponentProps } from './PickListViewer';

export function PickDnDCard({ pickInfo }: PickViewDnDItemComponentProps) {
  const {
    selectedPickIdList,
    selectSinglePick,
    getOrderedPickIdListByFolderId,
    focusPickId,
    setSelectedPickIdList,
    isDragging,
  } = usePickStore();
  const { memo, title, linkInfo, id: pickId, parentFolderId } = pickInfo;
  const { imageUrl, url } = linkInfo;
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
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div
        className={`${pickCardLayout} ${isSelected ? selectedDragItemStyle : ''} ${isActiveDragging ? isActiveDraggingItemStyle : ''}`}
        onDoubleClick={openUrl}
        onClick={(event) => handleClick(pickId, event)}
      >
        <div className={cardImageSectionStyle}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              width={278}
              height={64}
              className={cardImageStyle}
              alt=""
            />
          ) : (
            <div className={defaultCardImageSectionStyle} />
          )}
        </div>

        <div className={cardTitleSectionStyle}>
          <p>{title}</p>
        </div>
        <div className={cardDescriptionSectionStyle}>
          <p>{memo}</p>
        </div>
      </div>
    </div>
  );
}
