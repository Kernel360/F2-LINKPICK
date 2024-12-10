'use client';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import { PickCarouselCard } from './PickCarouselCard';
import {
  recommendedPickCarouselStyle,
  recommendedPickItemListStyle,
  chevronLeftIconStyle,
  chevronRightIconStyle,
  recommendedPickCarouselLayoutStyle,
} from './RecommendedPickCarousel.css';
import { RecommendPickDraggable } from './RecommendPickDraggable';
import { RecommendPickCategoryType, RecommendPickType } from '@/types';

export function RecommendedPickCarousel({
  recommendPickList,
  recommendPickCategoryType,
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
                <RecommendPickDraggable
                  key={recommendPick.url}
                  recommendPick={recommendPick}
                  recommendPickCategoryType={recommendPickCategoryType}
                >
                  <PickCarouselCard recommendPick={recommendPick} />
                </RecommendPickDraggable>
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
  recommendPickCategoryType: RecommendPickCategoryType;
}
