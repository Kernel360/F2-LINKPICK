import { getTagList } from '@/apis/tag/getTagList';
import { tagKeys } from '@/queries/tagKeys';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

export default async function FolderLayout({ children }: PropsWithChildren) {
  const tagList = await getTagList();
  const queryClient = new QueryClient();
  queryClient.setQueryData(tagKeys.all, tagList);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
