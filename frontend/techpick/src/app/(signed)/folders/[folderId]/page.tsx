'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';

export default function FolderDetailPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const selectSingleFolder = useTreeStore((state) => state.selectSingleFolder);

  useEffect(() => {
    selectSingleFolder(Number(folderId));
  }, [folderId, selectSingleFolder]);

  return <h1>Folder detail Page</h1>;
}
