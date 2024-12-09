'use client';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import { PickCarouselItem } from './PickCarouselCard';
import {
  recommendedPickCarouselStyle,
  recommendedPickItemListStyle,
  chevronLeftIconStyle,
  chevronRightIconStyle,
} from './RecommendedPickCarousel.css';

export function RecommendedPickCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    watchDrag: false,
    slidesToScroll: 2,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  return (
    <div className={recommendedPickCarouselStyle}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className={recommendedPickItemListStyle}>
          <PickCarouselItem />
          <PickCarouselItem />
          <PickCarouselItem />
          <PickCarouselItem />
          <PickCarouselItem />
          <PickCarouselItem />
          <PickCarouselItem />
          <PickCarouselItem />
          <PickCarouselItem />
          <PickCarouselItem />
        </div>
      </div>
      <button onClick={scrollPrev} className={chevronLeftIconStyle}>
        <ChevronLeftIcon />
      </button>
      <button onClick={scrollNext} className={chevronRightIconStyle}>
        <ChevronRightIcon />
      </button>
    </div>
  );
}
