'use client';

import { postRecommendPickViewEventLog } from '@/apis/eventLog/postRecommendPickViewEventLog';
import { useImageLoader } from '@/hooks/useImageLoader';
import { useOpenUrlInNewTab } from '@/hooks/useOpenUrlInNewTab';
import type { RecommendPickType } from '@/types/RecommendPickType';
import Image from 'next/image';
import {
  defaultImageLayoutStyle,
  defaultImageStyle,
  pickCarouselItemStyle,
  pickImageStyle,
  pickTitleStyle,
} from '../RecommendedPickCarousel/pickCarouselCard.css';

export function PickCarouselCardOverlay({
  recommendPick,
}: PickCarouselCardOverlayProps) {
  const { openUrlInNewTab } = useOpenUrlInNewTab(recommendPick.url);
  const { imageStatus } = useImageLoader(recommendPick.imageUrl);

  const onOpenLink = async () => {
    try {
      openUrlInNewTab();
      await postRecommendPickViewEventLog({ url: recommendPick.url });
    } catch {
      /*empty */
    }
  };

  return (
    <div
      className={pickCarouselItemStyle}
      onClick={onOpenLink}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onOpenLink();
        }
      }}
    >
      {imageStatus === 'loaded' ? (
        <img
          src={recommendPick.imageUrl}
          alt=""
          className={pickImageStyle}
          width="250"
          height="131"
        />
      ) : (
        <div className={defaultImageLayoutStyle}>
          <Image
            src={'/image/default_image.svg'}
            alt=""
            className={`${defaultImageStyle}`}
            width="80"
            height="65"
          />
        </div>
      )}

      <p className={pickTitleStyle}>{recommendPick.title}</p>
    </div>
  );
}

interface PickCarouselCardOverlayProps {
  recommendPick: RecommendPickType;
}
