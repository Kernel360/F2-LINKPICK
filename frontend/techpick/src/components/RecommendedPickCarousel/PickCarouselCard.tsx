'use client';

import Image from 'next/image';
import {
  pickCarouselItemStyle,
  pickTitleStyle,
  pickImageStyle,
} from './PickCarouselItem.css';

export function PickCarouselItem() {
  return (
    <div className={pickCarouselItemStyle}>
      <Image
        src={'/image/default_image.svg'}
        alt=""
        className={pickImageStyle}
        width="250"
        height="131"
      />

      <p className={pickTitleStyle}>
        itletitletitletitletitletitletitletitletitletitletitletitlevtitledadsadsadsadadsad
      </p>
    </div>
  );
}
