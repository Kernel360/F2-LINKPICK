import { getPickListByFolderId } from '@/apis/pick/getPickListByFolderId';
import { ROUTES } from '@/constants/route';
import { getQueryClient } from '@/libs/@react-query/getQueryClient';
import { pickKeys } from '@/queries/pickKeys';
import { isMobileDevice } from '@/utils/isMobileDevice';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { MobileFolderDetailPage } from './MobileFolderDetailPage';

export default async function FolderDetailLayout({
  params,
  children,
}: PropsWithChildren<FolderDetailLayoutProps>) {
  const folderId = Number(params.folderId);

  if (Number.isNaN(folderId) || folderId < 0) {
    redirect(ROUTES.HOME);
  }

  const queryClient = getQueryClient();

  queryClient.prefetchInfiniteQuery({
    queryKey: pickKeys.folderInfinite(folderId),
    queryFn: ({ pageParam = 0 }) => {
      return getPickListByFolderId(folderId, pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: { hasNext: boolean; lastCursor: number }) => {
      return lastPage.hasNext ? lastPage.lastCursor : undefined;
    },
  });

  if (await isMobileDevice()) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MobileFolderDetailPage />
      </HydrationBoundary>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

interface FolderDetailLayoutProps {
  params: { folderId: string };
}
