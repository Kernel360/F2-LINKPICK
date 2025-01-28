import { getPickListByFolderId } from '@/apis/pick/getPickListByFolderId';
import { getQueryClient } from '@/libs/@react-query/getQueryClient';
import { pickKeys } from '@/queries/pickKeys';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

export default async function FolderDetailLayout({
  params,
  children,
}: PropsWithChildren<FolderDetailLayoutProps>) {
  const queryClient = getQueryClient();

  const folderId = Number(params.folderId);

  await queryClient.prefetchQuery({
    queryKey: pickKeys.folderId(folderId),
    queryFn: () => getPickListByFolderId(folderId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

interface FolderDetailLayoutProps {
  params: { folderId: string };
}
