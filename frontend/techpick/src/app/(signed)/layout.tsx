import { FeedbackToolbar } from '@/components/FeedbackToolbar';
import { FolderAndPickDndContextProvider } from '@/components/FolderAndPickDndContextProvider';
import { ScreenLogger } from '@/components/ScreenLogger';
import ShortcutKey from '@/components/ShortcutKey';
import { SideNavigationBar } from '@/components/SideNavigationBar/SideNavigationBar';
import type { PropsWithChildren } from 'react';
import { pageContainerLayout } from './layout.css';

export default function SignedLayout({ children }: PropsWithChildren) {
  return (
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
  );
}
