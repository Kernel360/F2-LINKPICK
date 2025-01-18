'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import type { PickViewItemComponentProps } from './PickListViewer';
import {
  cardImageSectionStyle,
  cardImageStyle,
  cardTitleSectionStyle,
  defaultCardImageSectionStyle,
  pickCardLayout,
} from './pickCard.css';

export function PickCard({ pickInfo }: PickViewItemComponentProps) {
  const { title, linkInfo } = pickInfo;
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
    </div>
  );
}
