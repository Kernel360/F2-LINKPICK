import type { PropsWithChildren } from 'react';
import { FolderAndPickDndContextProvider, FolderTree } from '@/components';
import { FeedbackToolbar } from '@/components/FeedbackToolbar';
import ShortcutKey from '@/components/ShortcutKey';
import { pageContainerLayout } from './layout.css';

export default function SignedLayout({ children }: PropsWithChildren) {
  return (
    <div className={pageContainerLayout}>
      <FolderAndPickDndContextProvider>
        <FolderTree />
        {/** 선택한 폴더에 따른 컨텐츠가 나옵니다. */}
        {children}
        <FeedbackToolbar />
        <ShortcutKey />
      </FolderAndPickDndContextProvider>
    </div>
  );
}
