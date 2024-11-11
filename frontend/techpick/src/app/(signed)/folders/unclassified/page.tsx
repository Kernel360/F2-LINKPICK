'use client';

import { useEffect } from 'react';
import { PickListViewerPanel } from '@/components/PickListViewerPanel/PickListViewerPanel';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';

export default function UnclassifiedFolderPage() {
  const selectSingleFolder = useTreeStore((state) => state.selectSingleFolder);
  const basicFolderMap = useTreeStore((state) => state.basicFolderMap);

  useEffect(
    function selectUnclassifiedFolderId() {
      if (!basicFolderMap) {
        return;
      }

      selectSingleFolder(basicFolderMap['UNCLASSIFIED'].id);
    },
    [basicFolderMap, selectSingleFolder]
  );

  // 커밋을 위한 주석

  return <PickListViewerPanel />;
}
