'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { PickRecordHeader } from '@/components';
const EmptyPickRecordImage = dynamic(() =>
  import('@/components/EmptyPickRecordImage').then(
    (mod) => mod.EmptyPickRecordImage
  )
);
import { FolderContentHeader } from '@/components/FolderContentHeader/FolderContentHeader';
import { FolderContentLayout } from '@/components/FolderContentLayout';
import { FolderLoadingPage } from '@/components/FolderLoadingPage';
import { PickContentLayout } from '@/components/PickContentLayout';
import { PickDraggableListLayout } from '@/components/PickDraggableListLayout';
import { PickDraggableRecord } from '@/components/PickRecord/PickDraggableRecord';
import {
  useClearSelectedPickIdsOnMount,
  useFetchPickRecordByFolderId,
  useFetchTagList,
  useResetPickFocusOnOutsideClick,
} from '@/hooks';
import { useTreeStore } from '@/stores';
import { getOrderedPickListByFolderId } from '@/utils';

export default function RecycleBinFolderPage() {
  const selectSingleFolder = useTreeStore((state) => state.selectSingleFolder);
  const basicFolderMap = useTreeStore((state) => state.basicFolderMap);
  const { isLoading, data } = useFetchPickRecordByFolderId({
    folderId: basicFolderMap?.RECYCLE_BIN.id,
    alwaysFetch: true,
  });
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

  if (!basicFolderMap || (isLoading && !data)) {
    return <FolderLoadingPage />;
  }

  const pickList = getOrderedPickListByFolderId(data);

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
        )}
      </PickContentLayout>
    </FolderContentLayout>
  );
}
