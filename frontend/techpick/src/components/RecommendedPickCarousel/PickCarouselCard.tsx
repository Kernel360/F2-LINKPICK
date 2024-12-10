'use client';

import Image from 'next/image';
import { useOpenUrlInNewTab } from '@/hooks';
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

  const { openUrlInNewTab } = useOpenUrlInNewTab(recommendPick.url);

  return (
    <div className={pickCarouselItemStyle} onDoubleClick={openUrlInNewTab}>
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
