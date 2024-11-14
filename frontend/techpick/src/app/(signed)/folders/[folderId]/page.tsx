'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DraggablePickListViewer } from '@/components';
import { ROUTES } from '@/constants';
import { usePickStore, useTreeStore } from '@/stores';

export default function FolderDetailPage() {
  const router = useRouter();
  const { folderId: stringFolderId } = useParams<{ folderId: string }>();
  const { fetchPickDataByFolderId, getOrderedPickListByFolderId } =
    usePickStore();
  const selectSingleFolder = useTreeStore((state) => state.selectSingleFolder);
  const folderId = Number(stringFolderId);

  useEffect(
    function selectFolderId() {
      if (!isFolderIdValid(folderId)) {
        router.replace(ROUTES.UNCLASSIFIED_FOLDER);
        return;
      }

      selectSingleFolder(Number(folderId));
    },
    [folderId, router, selectSingleFolder]
  );

  useEffect(
    function loadPickDataByFolderIdFromRemote() {
      if (!isFolderIdValid(folderId)) {
        router.replace(ROUTES.UNCLASSIFIED_FOLDER);
        return;
      }

      fetchPickDataByFolderId(folderId);
    },
    [fetchPickDataByFolderId, folderId, router]
  );

  const isFolderIdValid = (folderId: number) => {
    if (Number.isNaN(folderId)) {
      return false;
    }

    return true;
  };

  return (
    <DraggablePickListViewer
      pickList={getOrderedPickListByFolderId(folderId)}
      folderId={folderId}
    />
  );
}
