'use client';

import { postRecommendPickViewEventLog } from '@/apis/eventLog/postRecommendPickViewEventLog';
import { useEventLogger } from '@/hooks/useEventLogger';
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
} from './pickCarouselCard.css';

export function PickCarouselCard({ recommendPick }: PickCarouselCardProps) {
  const { openUrlInNewTab } = useOpenUrlInNewTab(recommendPick.url);
  const { imageStatus } = useImageLoader(recommendPick.imageUrl);
  const { trackEvent: trackRecommendBookmarkClick } = useEventLogger({
    eventName: 'recommend_page_bookmark_click',
    logInfo: {
      bookmarkTitle: recommendPick.title,
    },
  });

  const onOpenLink = async () => {
    try {
      openUrlInNewTab();
      trackRecommendBookmarkClick();
      await postRecommendPickViewEventLog({ url: recommendPick.url });
    } catch {
      /*empty */
    }
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div className={pickCarouselItemStyle} onClick={onOpenLink}>
      {imageStatus === 'loading' && <div className={defaultImageLayoutStyle} />}
      {imageStatus === 'loaded' && (
        <img
          src={recommendPick.imageUrl}
          alt=""
          className={pickImageStyle}
          width="250"
          height="131"
        />
      )}
      {imageStatus === 'error' && (
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

interface PickCarouselCardProps {
  recommendPick: RecommendPickType;
}
