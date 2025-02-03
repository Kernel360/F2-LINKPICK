import { getPickListByFolderId } from '@/apis/pick/getPickListByFolderId';
import { ROUTES } from '@/constants/route';
import { getQueryClient } from '@/libs/@react-query/getQueryClient';
import { pickKeys } from '@/queries/pickKeys';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import type { PropsWithChildren } from 'react';

export default async function FolderDetailLayout({
  params,
  children,
}: PropsWithChildren<FolderDetailLayoutProps>) {
  const folderId = Number(params.folderId);

  if (Number.isNaN(folderId) || folderId < 0) {
    redirect(ROUTES.HOME);
  }

  const queryClient = getQueryClient();

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
