'use client';

import { FolderTree } from '@/components';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';

export default function TreePage() {
  const { getFolderMap, getBasicFolderMap } = useTreeStore.getState();

  getFolderMap();
  getBasicFolderMap();

  return <FolderTree />;
}
