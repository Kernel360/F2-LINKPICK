'use client';
import { useCancelFolderShare } from '@/queries/useCancelFolderShare';
import { useFetchFolders } from '@/queries/useFetchFolders';
import { useShareFolder } from '@/queries/useShareFolder';
import { checkIsSharedFolder } from '@/utils/checkIsSharedFolder';
import { notifySuccess } from '@/utils/toast';
import { useState } from 'react';
import { useDisclosure } from './useDisclosure';

export default function useHandleRequestShareFolder(folderId: number) {
  const {
    isOpen: isOpenShareDialog,
    onOpen: onOpenShareDialog,
    onClose: onCloseShareDialog,
  } = useDisclosure();
  const { data: folderRecord } = useFetchFolders();
  const isShareFolder = checkIsSharedFolder({ folderId, folderRecord });
  const { mutateAsync: shareFolder } = useShareFolder();
  const { mutateAsync: cancelFolerShare } = useCancelFolderShare();
  const [uuid, setUuid] = useState<string>('');

  /**
   * @description post 폴더 공유 요청
   * */
  async function requestShareFolder() {
    const response = await shareFolder(folderId);
    onOpenShareDialog();
    setUuid(response.folderAccessToken);

    return () => {
      setUuid('');
    };
  }

  /**
   * @description delete 폴더 공유 요청
   * */
  async function deleteShareFolder() {
    await cancelFolerShare(folderId);
    notifySuccess('폴더가 비공개되었습니다.');
  }
  return {
    uuid,
    isShareFolder,
    isOpenShareDialog,
    onCloseShareDialog,
    handleOpenShareDialog: isShareFolder
      ? deleteShareFolder
      : requestShareFolder,
  };
}
