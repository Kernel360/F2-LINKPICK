'use client';

import dynamic from 'next/dynamic';
import { notFound, redirect, useParams, } from 'next/navigation';
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
import { ROUTES } from '@/constants/route';
import { useClearSelectedPickIdsOnMount } from '@/hooks/useClearSelectedPickIdsOnMount';
import { useFetchPickRecordByFolderId } from '@/hooks/useFetchPickRecordByFolderId';
import { useResetPickFocusOnOutsideClick } from '@/hooks/useResetPickFocusOnOutsideClick';
import { useFetchTagList } from '@/queries/useFetchTagList';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { getOrderedPickListByFolderId } from '@/utils/getOrderedPickListByFolderId';

export default function FolderDetailPage() {
  const { folderId: stringFolderId } = useParams<{ folderId: string }>();
  const selectSingleFolder = useTreeStore((state) => state.selectSingleFolder);
  const folderId = Number(stringFolderId);
  const basicFolderMap = useTreeStore((state) => state.basicFolderMap);
  const { isLoading, data, isError } = useFetchPickRecordByFolderId({
    folderId: folderId,
    alwaysFetch: true,
  });
  useResetPickFocusOnOutsideClick();
  useClearSelectedPickIdsOnMount();
  useFetchTagList();

  useEffect(
    function selectFolderId() {
      if (!isFolderIdValid(folderId)) {
        notFound();
      }

      selectSingleFolder(Number(folderId));
    },
    [folderId, selectSingleFolder],
  );

  const isFolderIdValid = (folderId: number) => {
    if (Number.isNaN(folderId)) {
      return false;
    }

    return true;
  };

  if (!basicFolderMap || (isLoading && !data)) {
    return <FolderLoadingPage />;
  }

  if (isError) {
    redirect(ROUTES.HOME);
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
          <>
            <PickDraggableListLayout folderId={folderId} viewType="record">
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
