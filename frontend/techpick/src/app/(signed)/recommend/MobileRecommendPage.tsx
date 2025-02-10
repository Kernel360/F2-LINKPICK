'use client';

import { FolderNavigationItemList } from '@/components/FolderNavigationItemList';
import { PullToRefreshContainer } from '@/components/PullToRefreshContainer';
import { PickCarouselCard } from '@/components/RecommendedPickCarousel/PickCarouselCard';
import { useFetchSuggestionArticleList } from '@/queries/useFetchSuggestionArticleList';
import useEmblaCarousel from 'embla-carousel-react';
import {
  carouselContainer,
  carouselSlide,
  carouselViewPort,
} from './mobileRecommendPage.css';

export function MobileRecommendPage() {
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const { data: articleList = [], refetch } = useFetchSuggestionArticleList();

  return (
    <PullToRefreshContainer
      onRefresh={async () => {
        await refetch();
      }}
    >
      <h2>이런 글은 어떠세요?</h2>
      <div className={carouselViewPort} ref={emblaRef}>
        <div className={carouselContainer}>
          {articleList.map((article) => {
            return (
              <div key={article.url} className={carouselSlide}>
                <PickCarouselCard recommendPick={article} />
              </div>
            );
          })}
        </div>
      </div>

      <FolderNavigationItemList />
    </PullToRefreshContainer>
  );
}
