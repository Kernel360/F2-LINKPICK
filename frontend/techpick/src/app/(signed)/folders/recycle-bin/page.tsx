'use client';

import { useEffect } from 'react';
import { PickRecordHeader } from '@/components';
import { EmptyPickRecordImage } from '@/components/EmptyPickRecordImage';
import { FolderContentHeader } from '@/components/FolderContentHeader/FolderContentHeader';
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
      <FolderContentHeader />
      <PickContentLayout>
        <PickRecordHeader />
        {pickList.length === 0 ? (
          <EmptyPickRecordImage
            title="휴지통이 비어있습니다."
            description="삭제하고 싶은 픽이 있다면 이곳으로 옮겨주세요!"
          />
        ) : (
          <>
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
          </>
        )}
      </PickContentLayout>
    </FolderContentLayout>
  );
}
