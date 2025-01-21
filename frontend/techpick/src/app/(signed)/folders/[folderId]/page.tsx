'use client';

import dynamic from 'next/dynamic';
import { redirect, useParams } from 'next/navigation';
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
import { useFetchBasicFolders } from '@/queries/useFetchBasicFolders';
import { useFetchTagList } from '@/queries/useFetchTagList';
import { getOrderedPickListByFolderId } from '@/utils/getOrderedPickListByFolderId';

export default function FolderDetailPage() {
  const { folderId: stringFolderId } = useParams<{ folderId: string }>();
  const folderId = Number(stringFolderId);
  const { data: basicFolderRecord } = useFetchBasicFolders();
  const { isLoading, data, isError } = useFetchPickRecordByFolderId({
    folderId: folderId,
    alwaysFetch: true,
  });
  useResetPickFocusOnOutsideClick();
  useClearSelectedPickIdsOnMount();
  useFetchTagList();

  if (!basicFolderRecord || (isLoading && !data)) {
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
