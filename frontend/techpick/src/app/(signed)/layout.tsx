import { FeedbackToolbar } from '@/components/FeedbackToolbar';
import { FolderAndPickDndContextProvider } from '@/components/FolderAndPickDndContextProvider';
import { FolderTree } from '@/components/FolderTree';
import { ScreenLogger } from '@/components/ScreenLogger';
import ShortcutKey from '@/components/ShortcutKey';
import type { PropsWithChildren } from 'react';
import { pageContainerLayout } from './layout.css';

export default function SignedLayout({ children }: PropsWithChildren) {
  return (
    <ScreenLogger eventName="page_view_signed_user">
      <div className={pageContainerLayout}>
        <FolderAndPickDndContextProvider>
          <FolderTree />
          {/** 선택한 폴더에 따른 컨텐츠가 나옵니다. */}
          {children}
          <FeedbackToolbar />
          <ShortcutKey />
        </FolderAndPickDndContextProvider>
      </div>
    </ScreenLogger>
  );
}
