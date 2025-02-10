'use client';

import { postRecommendPickViewEventLog } from '@/apis/eventLog/postRecommendPickViewEventLog';
import { useEventLogger } from '@/hooks/useEventLogger';
import { useImageLoader } from '@/hooks/useImageLoader';
import { useOpenUrlInNewTab } from '@/hooks/useOpenUrlInNewTab';
import type { RecommendPickType } from '@/types/RecommendPickType';
import {
  defaultImageLayoutStyle,
  defaultImageStyle,
  pickCarouselItemStyle,
  pickImageStyle,
  pickTitleStyle,
} from './mobilePickCard.css';

export function MobilePickCard({ recommendPick }: MobilePickCard) {
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
        <img src={recommendPick.imageUrl} alt="" className={pickImageStyle} />
      )}
      {imageStatus === 'error' && (
        <div className={defaultImageLayoutStyle}>
          <img
            src={'/image/default_image.svg'}
            alt=""
            className={`${defaultImageStyle}`}
          />
        </div>
      )}
      <p className={pickTitleStyle}>{recommendPick.title}</p>
    </div>
  );
}

interface MobilePickCard {
  recommendPick: RecommendPickType;
}
