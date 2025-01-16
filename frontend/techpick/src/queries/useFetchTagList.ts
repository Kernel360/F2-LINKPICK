'use client';

import { useQuery } from '@tanstack/react-query';
import { getTagList } from '@/apis/tag';
import { tagKeys } from './tagKeys';

export function useFetchTagList() {
  return useQuery({ queryKey: tagKeys.all, queryFn: getTagList });
}
