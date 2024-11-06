import type { PropsWithChildren } from 'react';
import { FolderTree } from '@/components';
import { pageContainerLayout } from './layout.css';

export default function FolderLayout({ children }: PropsWithChildren) {
  return (
    <div className={pageContainerLayout}>
      <FolderTree />
      {children}
    </div>
  );
}
