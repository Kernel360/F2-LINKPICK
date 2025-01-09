import { useState } from 'react';
import { deleteMyShareFolder } from '@/apis/folder/deleteShareFolder';
import { shareFolder } from '@/apis/folder/shareFolder';
import { useTreeStore } from '@/stores';
import { notifySuccess } from '@/utils';
import { useDisclosure } from './useDisclosure';

export default function useHandleRequestShareFolder(folderId: number) {
  const { checkIsShareFolder, updateFolderAccessTokenByFolderId } =
    useTreeStore();
  const {
    isOpen: isOpenShareDialog,
    onOpen: onOpenShareDialog,
    onClose: onCloseShareDialog,
  } = useDisclosure();
  const isShareFolder = checkIsShareFolder(folderId);
  const [uuid, setUuid] = useState<string>('');

  /**
   * @description post 폴더 공유 요청
   * */
  async function requestShareFolder() {
    const response = await shareFolder(folderId);
    onOpenShareDialog();
    setUuid(response.folderAccessToken);
    /**
     * @question 상태를 일치시키기 위해 사용했는데 전체적으로 리팩토링이 필요할 거 같습니다..
     * 리뷰 부탁드립니다.
     */
    updateFolderAccessTokenByFolderId(folderId, response.folderAccessToken);

    return () => {
      setUuid('');
    };
  }

  /**
   * @description delete 폴더 공유 요청
   * */
  async function deleteShareFolder() {
    await deleteMyShareFolder(folderId);
    notifySuccess('폴더가 비공개되었습니다.');
    /**
     * @question 상태를 일치시키기 위해 사용했는데 전체적으로 리팩토링이 필요할 거 같습니다..
     * 리뷰 부탁드립니다.
     */
    updateFolderAccessTokenByFolderId(folderId, null);
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
