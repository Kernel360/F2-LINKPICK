'use client';

import type { RecommendPickCategoryType } from '@/types/RecommendPickCategoryType';
import type { RecommendPickType } from '@/types/RecommendPickType';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { PickCarouselCard } from './PickCarouselCard';
import { RecommendPickDraggable } from './RecommendPickDraggable';
import {
  chevronLeftIconStyle,
  chevronRightIconStyle,
  recommendedPickCarouselLayoutStyle,
  recommendedPickCarouselStyle,
  recommendedPickItemListStyle,
} from './RecommendedPickCarousel.css';
export function RecommendedPickCarousel({
  recommendPickList,
  recommendPickCategoryType,
}: RecommendedPickCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    watchDrag: false,
    slidesToScroll: 4,
    align: 'start',
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(
    /**
     *
     * @description useEmblaCarousel의 event가 발생할 때마다 동작합니디.
     * 여기서는 스크롤(캐로셀이 움직일 때)와 윈도우의 크기가 변경할 때 동작합니다.
     * @link https://www.embla-carousel.com/api/events/
     */
    function listenCarouselEvent() {
      if (!emblaApi) return;

      onSelect();
      emblaApi.on('select', onSelect);
      emblaApi.on('reInit', onSelect);
      emblaApi.on('resize', onSelect);

      return () => {
        emblaApi.off('select', onSelect);
        emblaApi.off('reInit', onSelect);
      };
    },
    [emblaApi, onSelect],
  );

  return (
    <div className={recommendedPickCarouselLayoutStyle}>
      <div className={recommendedPickCarouselStyle}>
        <div ref={emblaRef}>
          <div className={recommendedPickItemListStyle}>
            {recommendPickList.map((recommendPick) => (
              <RecommendPickDraggable
                key={recommendPick.url}
                recommendPick={recommendPick}
                recommendPickCategoryType={recommendPickCategoryType}
              >
                <PickCarouselCard recommendPick={recommendPick} />
              </RecommendPickDraggable>
            ))}
          </div>
        </div>
      </div>
      {canScrollPrev && (
        <ChevronLeftIcon
          onClick={scrollPrev}
          role="button"
          className={chevronLeftIconStyle}
        />
      )}
      {canScrollNext && (
        <ChevronRightIcon
          onClick={scrollNext}
          role="button"
          className={chevronRightIconStyle}
        />
      )}
    </div>
  );
}

interface RecommendedPickCarouselProps {
  recommendPickList: RecommendPickType[];
  recommendPickCategoryType: RecommendPickCategoryType;
}
