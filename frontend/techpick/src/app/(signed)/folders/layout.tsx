import { getBasicFolders } from '@/apis/folder/getBasicFolders';
import { getFolders } from '@/apis/folder/getFolders';
import { getTagList } from '@/apis/tag/getTagList';
import { getQueryClient } from '@/libs/@react-query/getQueryClient';
import { folderKeys } from '@/queries/folderKeys';
import { tagKeys } from '@/queries/tagKeys';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

export default async function FolderLayout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: folderKeys.basic(),
    queryFn: getBasicFolders,
  });

  queryClient.prefetchQuery({
    queryKey: folderKeys.root(),
    queryFn: getFolders,
  });

  queryClient.prefetchQuery({
    queryKey: tagKeys.all,
    queryFn: getTagList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
