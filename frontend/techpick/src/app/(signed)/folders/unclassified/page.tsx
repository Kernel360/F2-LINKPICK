'use client';

import { useEffect } from 'react';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { usePickStore } from '@/stores/pickStore/pickStore';

export default function UnclassifiedFolderPage() {
  const { fetchPickDataByFolderId, pickRecord } = usePickStore();
  const selectSingleFolder = useTreeStore((state) => state.selectSingleFolder);
  const basicFolderMap = useTreeStore((state) => state.basicFolderMap);

  useEffect(
    function selectUnclassifiedFolderId() {
      if (!basicFolderMap) {
        return;
      }

      selectSingleFolder(basicFolderMap['UNCLASSIFIED'].id);
      fetchPickDataByFolderId(basicFolderMap['UNCLASSIFIED'].id);
    },
    [basicFolderMap, selectSingleFolder, fetchPickDataByFolderId]
  );

  useEffect(() => {
    if (!basicFolderMap) {
      return;
    }

    if (pickRecord[basicFolderMap['UNCLASSIFIED'].id]) {
      console.log('pickRecord', pickRecord[basicFolderMap['UNCLASSIFIED'].id]);
    }
  }, [basicFolderMap, pickRecord]);

  return <h1>UnclassifiedFolderPage page</h1>;
}
