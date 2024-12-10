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
  recommendedPickCarouselLayoutStyle,
} from './RecommendedPickCarousel.css';
import { RecommendPickType } from '@/types';

export function RecommendedPickCarousel({
  recommendPickList,
}: RecommendedPickCarouselProps) {
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
    <div className={recommendedPickCarouselLayoutStyle}>
      <div className={recommendedPickCarouselStyle}>
        <div ref={emblaRef}>
          <div className={recommendedPickItemListStyle}>
            {recommendPickList.map((recommendPick) => {
              return (
                <PickCarouselItem
                  key={recommendPick.url}
                  recommendPick={recommendPick}
                />
              );
            })}
          </div>
        </div>
      </div>
      <ChevronLeftIcon
        onClick={scrollPrev}
        role="button"
        className={chevronLeftIconStyle}
      />

      <ChevronRightIcon
        onClick={scrollNext}
        role="button"
        className={chevronRightIconStyle}
      />
    </div>
  );
}

interface RecommendedPickCarouselProps {
  recommendPickList: RecommendPickType[];
}
