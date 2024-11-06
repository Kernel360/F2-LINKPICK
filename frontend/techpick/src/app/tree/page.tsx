'use client';

import { FolderTree } from '@/components';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { pageContainerLayout } from './page.css';

export default function TreePage() {
  const { getFolders, getBasicFolders } = useTreeStore.getState();

  getFolders();
  getBasicFolders();

  return (
    <div className={pageContainerLayout}>
      <FolderTree />
      {/**나중에 픽리스트가 들어갈 예정입니다. */}
      <div
        style={{ width: '100%', backgroundColor: 'gray', height: '100vh' }}
      ></div>
    </div>
  );
}
