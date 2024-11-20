'use client';

import { useEffect } from 'react';
import { PickDraggableListLayout } from '@/components/PickDraggableListLayout';
import { PickDraggableRecord } from '@/components/PickRecord/PickDraggableRecord';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { usePickStore } from '@/stores/pickStore/pickStore';

export default function UnclassifiedFolderPage() {
  const { fetchPickDataByFolderId, getOrderedPickListByFolderId } =
    usePickStore();
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

  useEffect(
    function loadPickDataFromRemote() {
      if (!basicFolderMap) {
        return;
      }

      fetchPickDataByFolderId(basicFolderMap['UNCLASSIFIED'].id);
    },
    [basicFolderMap, fetchPickDataByFolderId]
  );

  if (!basicFolderMap) {
    return <div>loading...</div>;
  }

  const pickList = getOrderedPickListByFolderId(
    basicFolderMap['UNCLASSIFIED'].id
  );
  return (
    <PickDraggableListLayout
      folderId={basicFolderMap['UNCLASSIFIED'].id}
      viewType="record"
    >
      {pickList.map((pickInfo) => {
        return <PickDraggableRecord key={pickInfo.id} pickInfo={pickInfo} />;
      })}
    </PickDraggableListLayout>
  );
}
