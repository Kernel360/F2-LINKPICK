'use client';

import { useEffect } from 'react';
import { PickRecordHeader } from '@/components';
import { PickContentLayout } from '@/components/PickContentLayout';
import { PickContextMenu } from '@/components/PickContextMenu';
import { PickDraggableListLayout } from '@/components/PickDraggableListLayout';
import { PickDraggableRecord } from '@/components/PickRecord/PickDraggableRecord';
import {
  useClearSelectedPickIdsOnMount,
  useFetchTagList,
  useResetPickFocusOnOutsideClick,
} from '@/hooks';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { usePickStore } from '@/stores/pickStore/pickStore';

export default function UnclassifiedFolderPage() {
  const { fetchPickDataByFolderId, getOrderedPickListByFolderId } =
    usePickStore();
  const selectSingleFolder = useTreeStore((state) => state.selectSingleFolder);
  const basicFolderMap = useTreeStore((state) => state.basicFolderMap);
  useResetPickFocusOnOutsideClick();
  useClearSelectedPickIdsOnMount();
  useFetchTagList();

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
    <PickContentLayout>
      <PickRecordHeader />
      <PickDraggableListLayout
        folderId={basicFolderMap['UNCLASSIFIED'].id}
        viewType="record"
      >
        {pickList.map((pickInfo) => {
          return (
            <PickContextMenu
              basicFolderMap={basicFolderMap}
              pickInfo={pickInfo}
              key={pickInfo.id}
            >
              <PickDraggableRecord key={pickInfo.id} pickInfo={pickInfo} />
            </PickContextMenu>
          );
        })}
      </PickDraggableListLayout>
    </PickContentLayout>
  );
}
