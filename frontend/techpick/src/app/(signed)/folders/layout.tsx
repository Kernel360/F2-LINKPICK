import type { PropsWithChildren } from 'react';
import { FolderTree } from '@/components';
import { SearchWidget } from '@/components/SearchWidget/SearchWidget';
import { ListViewerLayout, pageContainerLayout } from './layout.css';

export default function FolderLayout({ children }: PropsWithChildren) {
  return (
    <div className={pageContainerLayout}>
      <FolderTree />
      <div className={ListViewerLayout}>
        <SearchWidget />
        {children}
      </div>
    </div>
  );
}
