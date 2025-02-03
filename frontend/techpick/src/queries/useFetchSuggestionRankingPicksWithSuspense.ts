'use client';

import { getSuggestionRankingPicks } from '@/apis/getSuggestionRankingPicks';
import { useSuspenseQuery } from '@tanstack/react-query';
import { suggestionKeys } from './suggestionKeys';

export function useFetchSuggestionRankingPicksWithSuspense() {
  return useSuspenseQuery({
    queryKey: suggestionKeys.ranking(),
    queryFn: getSuggestionRankingPicks,
  });
}
