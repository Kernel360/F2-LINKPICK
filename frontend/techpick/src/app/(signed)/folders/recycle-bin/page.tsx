'use client';

import { useEffect } from 'react';
import { DraggablePickListViewer } from '@/components';
import { usePickStore, useTreeStore } from '@/stores';

export default function RecycleBinFolderPage() {
  const { fetchPickDataByFolderId, getOrderedPickListByFolderId } =
    usePickStore();
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

  useEffect(
    function loadPickDataFromRemote() {
      if (!basicFolderMap) {
        return;
      }

      fetchPickDataByFolderId(basicFolderMap['RECYCLE_BIN'].id);
    },
    [basicFolderMap, fetchPickDataByFolderId]
  );

  if (!basicFolderMap) {
    return <div>loading...</div>;
  }

  return (
    <DraggablePickListViewer
      pickList={getOrderedPickListByFolderId(basicFolderMap['RECYCLE_BIN'].id)}
      folderId={basicFolderMap['RECYCLE_BIN'].id}
    />
  );
}
