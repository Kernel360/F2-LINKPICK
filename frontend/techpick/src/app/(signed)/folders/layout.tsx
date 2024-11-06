'use client';

import type { PropsWithChildren } from 'react';
import { FolderTree } from '@/components';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';

export default function FolderLayout({ children }: PropsWithChildren) {
  const { getFolders, getBasicFolders } = useTreeStore.getState();

  getFolders();
  getBasicFolders();

  return (
    <div>
      <FolderTree />
      {children}
    </div>
  );
}
