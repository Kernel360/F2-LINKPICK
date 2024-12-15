'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
    slidesToScroll: 4,
    align: 'start',
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    [emblaApi, onSelect]
  );

  useEffect(
    function detectCarouselScrollEvent() {
      if (emblaApi) {
        const onWheel = (event: WheelEvent) => {
          event.preventDefault();
          event.stopPropagation();

          if (scrollTimeoutRef.current) return;

          scrollTimeoutRef.current = setTimeout(() => {
            if (event.deltaY > 0) {
              scrollNext();
            } else {
              scrollPrev();
            }

            scrollTimeoutRef.current = null;
          }, 200);
        };

        const viewport = emblaApi.rootNode();
        viewport.addEventListener('wheel', onWheel, { passive: false });

        return () => {
          viewport.removeEventListener('wheel', onWheel);
        };
      }
    },
    [emblaApi, scrollNext, scrollPrev]
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
