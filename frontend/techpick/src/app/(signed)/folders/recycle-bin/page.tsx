'use client';

import { useEffect } from 'react';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';

export default function RecycleBinFolderPage() {
  const selectSingleFolder = useTreeStore((state) => state.selectSingleFolder);
  const basicFolderMap = useTreeStore((state) => state.basicFolderMap);

  useEffect(
    function selectRecycleBinFolderId() {
      if (!basicFolderMap) {
        return;
      }

      selectSingleFolder(basicFolderMap['RECYCLE_BIN'].id);
    },
    [basicFolderMap, selectSingleFolder]
  );

  return <h1>RecycleBinFolderPage page</h1>;
}
