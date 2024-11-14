import type { PropsWithChildren } from 'react';
import { FolderTree, FolderAndPickDndContextProvider } from '@/components';
import { SearchWidget } from '@/components/SearchWidget/SearchWidget';
import { pageContainerLayout, ListViewerLayout } from './layout.css';

export default function FolderLayout({ children }: PropsWithChildren) {
  return (
    <div className={pageContainerLayout}>
      <FolderAndPickDndContextProvider>
        <FolderTree />
        <div className={ListViewerLayout}>
          <SearchWidget />
          {children}
        </div>
      </FolderAndPickDndContextProvider>
    </div>
  );
}
