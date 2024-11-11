'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import {
  cardDescriptionSectionStyle,
  cardImageSectionStyle,
  cardImageStyle,
  cardTitleSectionStyle,
  defaultCardImageSectionStyle,
  pickCardLayout,
} from './pickCard.css';
import { PickViewItemComponentProps } from './PickListViewer';

export function PickCard({ pickInfo }: PickViewItemComponentProps) {
  const { memo, title, linkInfo } = pickInfo;
  const { imageUrl, url } = linkInfo;

  const openUrl = useCallback(() => {
    window.open(url, '_blank');
  }, [url]);

  return (
    <div className={pickCardLayout} onDoubleClick={openUrl}>
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
  );
}
