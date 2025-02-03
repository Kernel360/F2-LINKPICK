'use client';

import { getSuggestionBlogArticleList } from '@/apis/getSuggestionBlogArticleList';
import { useSuspenseQuery } from '@tanstack/react-query';
import { suggestionKeys } from './suggestionKeys';

export function useFetchSuggestionArticleList() {
  return useSuspenseQuery({
    queryKey: suggestionKeys.article(),
    queryFn: getSuggestionBlogArticleList,
  });
}
