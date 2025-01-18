'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
const EmptyPickRecordImage = dynamic(() =>
  import('@/components/EmptyPickRecordImage').then(
    (mod) => mod.EmptyPickRecordImage,
  ),
);
import { FolderContentHeader } from '@/components/FolderContentHeader/FolderContentHeader';
import { FolderContentLayout } from '@/components/FolderContentLayout';
import { FolderLoadingPage } from '@/components/FolderLoadingPage';
import { PickContentLayout } from '@/components/PickContentLayout';
import { PickDraggableListLayout } from '@/components/PickDraggableListLayout';
import { PickDraggableRecord } from '@/components/PickRecord/PickDraggableRecord';
import { PickRecordHeader } from '@/components/PickRecord/PickRecordHeader';
import { useClearSelectedPickIdsOnMount } from '@/hooks/useClearSelectedPickIdsOnMount';
import { useFetchPickRecordByFolderId } from '@/hooks/useFetchPickRecordByFolderId';
import { useResetPickFocusOnOutsideClick } from '@/hooks/useResetPickFocusOnOutsideClick';
import { useFetchTagList } from '@/queries/useFetchTagList';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { getOrderedPickListByFolderId } from '@/utils/getOrderedPickListByFolderId';

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

      selectSingleFolder(basicFolderMap.RECYCLE_BIN.id);
    },
    [basicFolderMap, selectSingleFolder],
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
            description="삭제하고 싶은 북마크가 있다면 이곳으로 옮겨주세요!"
          />
        ) : (
          <PickDraggableListLayout
            folderId={basicFolderMap.RECYCLE_BIN.id}
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
