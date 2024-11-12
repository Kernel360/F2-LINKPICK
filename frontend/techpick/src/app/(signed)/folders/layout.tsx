import type { PropsWithChildren } from 'react';
import { FolderTree, FolderAndPickDndContextProvider } from '@/components';
import { pageContainerLayout } from './layout.css';

export default function FolderLayout({ children }: PropsWithChildren) {
  return (
    <div className={pageContainerLayout}>
      <FolderAndPickDndContextProvider>
        <FolderTree />
        {children}
      </FolderAndPickDndContextProvider>
    </div>
  );
}
