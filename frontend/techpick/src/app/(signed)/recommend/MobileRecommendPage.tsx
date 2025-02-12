'use client';

import { FolderNavigationItemList } from '@/components/FolderNavigationItemList';
import { MobilePickCard } from '@/components/MobilePickCard';
import { PullToRefreshContainer } from '@/components/PullToRefreshContainer';
import { useFetchSuggestionArticleList } from '@/queries/useFetchSuggestionArticleList';
import useEmblaCarousel from 'embla-carousel-react';
import {
  carouselContainer,
  carouselSlide,
  carouselViewPort,
  folderNavigationItemListLayoutStyle,
  suggestionDescriptionTitle,
} from './mobileRecommendPage.css';

export function MobileRecommendPage() {
  const [emblaRef] = useEmblaCarousel();
  const { data: articleList = [], refetch } = useFetchSuggestionArticleList();

  return (
    <PullToRefreshContainer
      onRefresh={async () => {
        await refetch();
      }}
    >
      <h2 className={suggestionDescriptionTitle}>이런 글은 어떠세요?</h2>
      <div className={carouselViewPort} ref={emblaRef}>
        <div className={carouselContainer}>
          {articleList.map((article) => {
            return (
              <div key={article.url} className={carouselSlide}>
                <MobilePickCard recommendPick={article} />
              </div>
            );
          })}
        </div>
      </div>

      <div className={folderNavigationItemListLayoutStyle}>
        <FolderNavigationItemList />
      </div>
    </PullToRefreshContainer>
  );
}
