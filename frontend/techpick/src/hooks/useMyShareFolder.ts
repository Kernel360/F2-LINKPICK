'use client';
import { useCancelFolderShare } from '@/queries/useCancelFolderShare';
import { useFetchFolderList } from '@/queries/useFetchFolderList';
import { useFetchFolders } from '@/queries/useFetchFolders';
import { checkIsSharedFolder } from '@/utils/checkIsSharedFolder';
import { notifyError, notifySuccess } from '@/utils/toast';
import { useMemo } from 'react';

export function useMyShareFolder() {
  const { data: folderRecord } = useFetchFolders();
  const { data: folderList = [] } = useFetchFolderList();
  const sharedFolderList = folderList.filter((folder) =>
    checkIsSharedFolder({ folderId: folder?.id, folderRecord }),
  );
  const { mutate: cancelFolderShare } = useCancelFolderShare();

  const myShareFolders = useMemo(() => {
    return sharedFolderList.map((folder) => ({
      sourceFolderId: folder.id,
      sourceFolderName: folder.name,
      sourceFolderCreatedAt: folder.createdAt,
      sourceFolderUpdatedAt: folder.updatedAt,
      folderAccessToken: folder.folderAccessToken ?? '',
    }));
  }, [sharedFolderList]);

  const handleDeleteMyShareFolder = async (sourceFolderId: number) => {
    cancelFolderShare(sourceFolderId, {
      onSuccess: () => {
        notifySuccess('공유 폴더가 삭제되었습니다.');
      },
      onError: () => {
        notifyError('공유 폴더 삭제에 실패했습니다.');
      },
    });
  };

  return { myShareFolders, handleDeleteMyShareFolder };
}
