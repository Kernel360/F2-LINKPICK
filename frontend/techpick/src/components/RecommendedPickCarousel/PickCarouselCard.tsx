'use client';

import Image from 'next/image';
import { useOpenUrlInNewTab } from '@/hooks';
import {
  pickCarouselItemStyle,
  pickTitleStyle,
  pickImageStyle,
  defaultImageStyle,
} from './pickCarouselCard.css';
import { RecommendPickType } from '@/types';

export function PickCarouselCard({ recommendPick }: PickCarouselCardProps) {
  const { openUrlInNewTab } = useOpenUrlInNewTab(recommendPick.url);

  return (
    <div className={pickCarouselItemStyle} onDoubleClick={openUrlInNewTab}>
      {recommendPick.imageUrl === '' ? (
        <div className={defaultImageStyle}>
          <Image
            src={'/image/default_image.svg'}
            alt=""
            className={pickImageStyle}
            width="80"
            height="65"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      ) : (
        <Image
          src={recommendPick.imageUrl}
          alt=""
          className={pickImageStyle}
          width="250"
          height="131"
        />
      )}

      <p className={pickTitleStyle}>{recommendPick.title}</p>
    </div>
  );
}

interface PickCarouselCardProps {
  recommendPick: RecommendPickType;
}
