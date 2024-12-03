import { PropsWithChildren } from 'react';
import { FolderTree, FolderAndPickDndContextProvider } from '@/components';
import { QnAFloatingLink } from '@/components/QnAFloatingLink';
import { pageContainerLayout } from './layout.css';

export default function FolderLayout({ children }: PropsWithChildren) {
  return (
    <div className={pageContainerLayout}>
      <FolderAndPickDndContextProvider>
        <FolderTree />
        {/** 선택한 폴더에 따른 컨텐츠가 나옵니다. */}
        {children}
        <QnAFloatingLink />
      </FolderAndPickDndContextProvider>
    </div>
  );
}
