import { getSuggestionBlogArticleList } from '@/apis/getSuggestionBlogArticleList';
import { getSuggestionRankingPicks } from '@/apis/getSuggestionRankingPicks';
import { getQueryClient } from '@/libs/@react-query/getQueryClient';
import { suggestionKeys } from '@/queries/suggestionKeys';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { type PropsWithChildren, Suspense } from 'react';
import { RecommendLoadingPage } from './RecommendLoadingPage';

export default function RecommendLayout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: suggestionKeys.ranking(),
    queryFn: getSuggestionRankingPicks,
  });

  queryClient.prefetchQuery({
    queryKey: suggestionKeys.article(),
    queryFn: getSuggestionBlogArticleList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<RecommendLoadingPage />}>{children}</Suspense>
    </HydrationBoundary>
  );
}
