'use client';

import { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import {
  emptyPickRecordImageLayoutStyle,
  emptyPickRecordImageStyle,
  emptyPickRecordTextLayoutStyle,
  titleTextStyle,
} from './emptyPickRecordImage.css';
import { Gap } from './Gap';

export function EmptyPickRecordImage({
  title = '픽이 없습니다',
  description = '픽을 추가해보세요!',
}: EmptyPickRecordImageProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: AnimationItem | null = null;

    if (typeof window !== 'undefined' && container.current) {
      anim = lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: '/lottie/emptyPickRecordImage.json',
      });
    }

    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, []);

  return (
    <div className={emptyPickRecordImageLayoutStyle}>
      <div className={emptyPickRecordImageStyle} ref={container}></div>
      <div className={emptyPickRecordTextLayoutStyle}>
        <p className={titleTextStyle}>{title}</p>
        <Gap verticalSize="gap4">
          <p> {description}</p>
        </Gap>
      </div>
    </div>
  );
}

interface EmptyPickRecordImageProps {
  title?: string;
  description?: string;
}
