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
import { useFetchBasicFolders } from '@/queries/useFetchBasicFolders';
import { useFetchTagList } from '@/queries/useFetchTagList';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { getOrderedPickListByFolderId } from '@/utils/getOrderedPickListByFolderId';

export default function UnclassifiedFolderPage() {
  const selectSingleFolder = useTreeStore((state) => state.selectSingleFolder);
  const { data: basicFolderRecord } = useFetchBasicFolders();
  const { isLoading, data } = useFetchPickRecordByFolderId({
    folderId: basicFolderRecord?.UNCLASSIFIED.id,
    alwaysFetch: true,
  });
  useResetPickFocusOnOutsideClick();
  useClearSelectedPickIdsOnMount();
  useFetchTagList();

  useEffect(
    function selectUnclassifiedFolderId() {
      if (!basicFolderRecord) {
        return;
      }

      selectSingleFolder(basicFolderRecord.UNCLASSIFIED.id);
    },
    [basicFolderRecord, selectSingleFolder],
  );

  if (!basicFolderRecord || (isLoading && !data)) {
    return <FolderLoadingPage />;
  }

  const pickList = getOrderedPickListByFolderId(data);

  return (
    <FolderContentLayout>
      <FolderContentHeader />
      <PickContentLayout>
        <PickRecordHeader />
        {pickList.length === 0 ? (
          <EmptyPickRecordImage />
        ) : (
          <PickDraggableListLayout
            folderId={basicFolderRecord.UNCLASSIFIED.id}
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
