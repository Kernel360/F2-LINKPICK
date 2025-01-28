'use client';

import { getPickListByQueryParam } from '@/apis/pick/getPickListByQueryParam';
import type { SearchQueryParamType } from '@/types/SearchQueryParamType';
import { useInfiniteQuery } from '@tanstack/react-query';
import { pickKeys } from './pickKeys';

export function useFetchSearchPickList(
  searchQueryParam: SearchQueryParamType,
  size = 10,
) {
  return useInfiniteQuery({
    queryKey: pickKeys.searchDetail(searchQueryParam),
    queryFn: ({ pageParam = 0 }) => {
      return getPickListByQueryParam(searchQueryParam, pageParam, size);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.lastCursor : undefined;
    },
  });
}
