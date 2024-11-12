import type { PropsWithChildren } from 'react';
import { FolderTree, FolderAndPickDndContext } from '@/components';
import { pageContainerLayout } from './layout.css';

export default function FolderLayout({ children }: PropsWithChildren) {
  return (
    <div className={pageContainerLayout}>
      <FolderAndPickDndContext>
        <FolderTree />
        {children}
      </FolderAndPickDndContext>
    </div>
  );
}
