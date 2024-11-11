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
import { PickViewDnDItemComponentProps } from './PickListViewer';

export function PickDnDCard({ pickInfo }: PickViewDnDItemComponentProps) {
  const { memo, title, linkInfo, id: pickId } = pickInfo;
  const { imageUrl, url } = linkInfo;

  const { selectedPickIdList, selectSinglePick } = usePickStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    // isDragging: isActiveDragging, 나중에 multi-select 때 동작하자
  } = useSortable({
    id: pickId,
    data: {
      id: `pick ${pickId}`,
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

  const handleClick = (
    pickId: number,
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();

    if (event.shiftKey && isSelectionActive(selectedPickIdList.length)) {
      // 니중에 다중선택
      return;
    }

    selectSinglePick(pickId);
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div
        className={pickCardLayout}
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
