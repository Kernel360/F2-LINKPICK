'use client';

import Image from 'next/image';
import { postRecommendPickViewEventLog } from '@/apis/eventLog';
import { useOpenUrlInNewTab } from '@/hooks';
import {
  pickCarouselItemStyle,
  pickTitleStyle,
  pickImageStyle,
  defaultImageStyle,
  defaultImageLayoutStyle,
} from './pickCarouselCard.css';
import { RecommendPickType } from '@/types';

export function PickCarouselCard({ recommendPick }: PickCarouselCardProps) {
  const { openUrlInNewTab } = useOpenUrlInNewTab(recommendPick.url);

  const onOpenLink = async () => {
    try {
      openUrlInNewTab();
      await postRecommendPickViewEventLog({ url: recommendPick.url });
    } catch {
      /*empty */
    }
  };

  return (
    <div className={pickCarouselItemStyle} onClick={onOpenLink}>
      {recommendPick.imageUrl === '' ? (
        <div className={defaultImageLayoutStyle}>
          <Image
            src={'/image/default_image.svg'}
            alt=""
            className={`${defaultImageStyle}`}
            width="80"
            height="65"
          />
        </div>
      ) : (
        <img
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
