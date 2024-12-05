import { useMemo } from 'react';
import { deleteMyShareFolder } from '@/apis/folder/deleteShareFolder';
import { useTreeStore } from '@/stores';
import { notifySuccess, notifyError } from '@/utils';

export function useMyShareFolder() {
  const { checkIsShareFolder, updateFolderAccessTokenByFolderId, treeDataMap } =
    useTreeStore();

  const myShareFolders = useMemo(() => {
    const folders = Object.values(treeDataMap);

    return folders
      .filter((folder) => checkIsShareFolder(folder.id))
      .map((folder) => ({
        sourceFolderId: folder.id!,
        sourceFolderName: folder.name!,
        sourceFolderCreatedAt: folder.createdAt!,
        sourceFolderUpdatedAt: folder.updatedAt!,
        folderAccessToken: folder.folderAccessToken ?? '',
      }));
  }, [checkIsShareFolder, treeDataMap]);

  const handleDeleteMyShareFolder = async (sourceFolderId: number) => {
    const deleteSuccess = await deleteMyShareFolder(sourceFolderId);
    if (deleteSuccess) {
      notifySuccess('공유 폴더가 삭제되었습니다.');
      updateFolderAccessTokenByFolderId(sourceFolderId, null);
    } else {
      notifyError('공유 폴더 삭제에 실패했습니다.');
    }
  };

  return { myShareFolders, handleDeleteMyShareFolder };
}
