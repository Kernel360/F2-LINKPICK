import { getSharedFolderList } from '@/apis/folder/getSharedFolderList';
import { getQueryClient } from '@/libs/@react-query/getQueryClient';
import { folderKeys } from '@/queries/folderKeys';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

export default async function MyPageLayout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: folderKeys.share(),
    queryFn: getSharedFolderList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
