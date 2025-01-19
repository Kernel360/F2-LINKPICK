'use client';

import { getTagList } from '@/apis/tag/getTagList';
import { useQuery } from '@tanstack/react-query';
import { tagKeys } from './tagKeys';

export function useFetchTagList() {
  return useQuery({ queryKey: tagKeys.all, queryFn: getTagList });
}
