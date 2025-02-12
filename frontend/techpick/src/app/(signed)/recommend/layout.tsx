import { getSuggestionBlogArticleList } from '@/apis/getSuggestionBlogArticleList';
import { getSuggestionRankingPicks } from '@/apis/getSuggestionRankingPicks';
import { getQueryClient } from '@/libs/@react-query/getQueryClient';
import { suggestionKeys } from '@/queries/suggestionKeys';
import { isMobileDevice } from '@/utils/isMobileDevice';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { type PropsWithChildren, Suspense } from 'react';
import { MobileRecommendPage } from './MobileRecommendPage';
import { RecommendLoadingPage } from './RecommendLoadingPage';

export default async function RecommendLayout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: suggestionKeys.article(),
    queryFn: getSuggestionBlogArticleList,
  });

  if (await isMobileDevice()) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MobileRecommendPage />
      </HydrationBoundary>
    );
  }

  queryClient.prefetchQuery({
    queryKey: suggestionKeys.ranking(),
    queryFn: getSuggestionRankingPicks,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<RecommendLoadingPage />}>{children}</Suspense>
    </HydrationBoundary>
  );
}
