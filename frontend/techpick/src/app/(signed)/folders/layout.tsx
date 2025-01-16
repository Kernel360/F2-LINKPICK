import type { PropsWithChildren } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getTagList } from '@/apis/tag';
import { tagKeys } from '@/queries';

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
