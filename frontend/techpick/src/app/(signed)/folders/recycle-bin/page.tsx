'use client';

import { useEffect } from 'react';
import { PickRecordHeader } from '@/components';
import { FolderContentLayout } from '@/components/FolderContentLayout';
import { PickContentLayout } from '@/components/PickContentLayout';
import { PickDraggableListLayout } from '@/components/PickDraggableListLayout';
import { PickDraggableRecord } from '@/components/PickRecord/PickDraggableRecord';
import {
  useClearSelectedPickIdsOnMount,
  useFetchTagList,
  useResetPickFocusOnOutsideClick,
} from '@/hooks';
import { usePickStore, useTreeStore } from '@/stores';

export default function RecycleBinFolderPage() {
  const { fetchPickDataByFolderId, getOrderedPickListByFolderId } =
    usePickStore();
  const selectSingleFolder = useTreeStore((state) => state.selectSingleFolder);
  const basicFolderMap = useTreeStore((state) => state.basicFolderMap);
  useResetPickFocusOnOutsideClick();
  useClearSelectedPickIdsOnMount();
  useFetchTagList();

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

  const pickList = getOrderedPickListByFolderId(
    basicFolderMap['RECYCLE_BIN'].id
  );

  return (
    <FolderContentLayout>
      <PickContentLayout>
        <PickRecordHeader />
        <PickDraggableListLayout
          folderId={basicFolderMap['RECYCLE_BIN'].id}
          viewType="record"
        >
          {pickList.map((pickInfo) => {
            return (
              <PickDraggableRecord key={pickInfo.id} pickInfo={pickInfo} />
            );
          })}
        </PickDraggableListLayout>
      </PickContentLayout>
    </FolderContentLayout>
  );
}
