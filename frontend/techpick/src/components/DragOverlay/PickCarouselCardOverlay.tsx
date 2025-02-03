'use client';
import { useImageLoader } from '@/hooks/useImageLoader';
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
  const { imageStatus } = useImageLoader(recommendPick.imageUrl);

  return (
    <div className={pickCarouselItemStyle}>
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

interface PickCarouselCardOverlayProps {
  recommendPick: RecommendPickType;
}
