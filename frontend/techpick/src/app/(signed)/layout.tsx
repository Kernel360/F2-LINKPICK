import { getBasicFolders } from '@/apis/folder/getBasicFolders';
import { getFolders } from '@/apis/folder/getFolders';
import { getTagList } from '@/apis/tag/getTagList';
import { FeedbackToolbar } from '@/components/FeedbackToolbar';
import { FolderAndPickDndContextProvider } from '@/components/FolderAndPickDndContextProvider';
import { MobileNavigationBar } from '@/components/MobileNavigationBar';
import { ScreenLogger } from '@/components/ScreenLogger';
import ShortcutKey from '@/components/ShortcutKey';
import { SideNavigationBar } from '@/components/SideNavigationBar/SideNavigationBar';
import { getQueryClient } from '@/libs/@react-query/getQueryClient';
import { folderKeys } from '@/queries/folderKeys';
import { tagKeys } from '@/queries/tagKeys';
import { isMobileDevice } from '@/utils/isMobileDevice';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { mobilePageContainerStyle, pageContainerLayout } from './layout.css';

export default async function SignedLayout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: tagKeys.all,
    queryFn: getTagList,
  });

  if (await isMobileDevice()) {
    return (
      <ScreenLogger eventName="page_view_signed_user">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MobileNavigationBar />
          <div className={mobilePageContainerStyle}>{children}</div>
        </HydrationBoundary>
      </ScreenLogger>
    );
  }

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: folderKeys.basic(),
      queryFn: getBasicFolders,
    }),
    queryClient.prefetchQuery({
      queryKey: folderKeys.root(),
      queryFn: getFolders,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ScreenLogger eventName="page_view_signed_user">
        <div className={pageContainerLayout}>
          <FolderAndPickDndContextProvider>
            {/** 선택한 폴더에 따른 컨텐츠가 나옵니다. */}
            <SideNavigationBar />
            {children}
            <FeedbackToolbar />
            <ShortcutKey />
          </FolderAndPickDndContextProvider>
        </div>
      </ScreenLogger>
    </HydrationBoundary>
  );
}
