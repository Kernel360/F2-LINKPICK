import { deleteMyShareFolder } from '@/apis/folder/deleteShareFolder';
import type { FolderRecordType } from '@/types/FolderRecordType';
import type { GetShareFolderListResponseType } from '@/types/GetShareFolderListResponseType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { folderKeys } from './folderKeys';

export function useCancelFolderShare() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyShareFolder,
    onMutate(cancelFolderShareId) {
      const prevFolders =
        queryClient.getQueryData<FolderRecordType>(folderKeys.root()) ?? {};

      const nextFolders = produce(prevFolders, (folders) => {
        if (folders[cancelFolderShareId]) {
          folders[cancelFolderShareId].folderAccessToken = null;
        }
      });
      queryClient.setQueryData(folderKeys.root(), nextFolders);

      const prevSharedFolderList =
        queryClient.getQueryData<GetShareFolderListResponseType>(
          folderKeys.share(),
        ) ?? [];

      const nextSharedFolderList = produce(
        prevSharedFolderList,
        (sharedFolderList) => {
          return sharedFolderList.filter(
            (sharedFolderInfo) =>
              sharedFolderInfo.sourceFolderId !== cancelFolderShareId,
          );
        },
      );
      queryClient.setQueryData(folderKeys.share(), nextSharedFolderList);

      return { prevFolders, prevSharedFolderList };
    },
    onError(_error, _variables, context) {
      const prevFolders = context?.prevFolders ?? {};
      const prevSharedFolderList = context?.prevSharedFolderList ?? [];
      queryClient.setQueryData(folderKeys.root(), prevFolders);
      queryClient.setQueryData(folderKeys.share(), prevSharedFolderList);
    },
  });
}
