'use client';

import Image from 'next/image';
import {
  pickCarouselItemStyle,
  pickTitleStyle,
  pickImageStyle,
} from './PickCarouselItem.css';
import { RecommendPickType } from '@/types';

export function PickCarouselItem({ recommendPick }: PickCarouselItemProps) {
  const imageUrl =
    recommendPick.imageUrl === ''
      ? '/image/default_image.svg'
      : recommendPick.imageUrl;

  return (
    <div className={pickCarouselItemStyle}>
      <Image
        src={imageUrl}
        alt=""
        className={pickImageStyle}
        width="250"
        height="131"
      />

      <p className={pickTitleStyle}>{recommendPick.title}</p>
    </div>
  );
}

interface PickCarouselItemProps {
  recommendPick: RecommendPickType;
}
