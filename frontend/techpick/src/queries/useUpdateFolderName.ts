'use client';

import { updateFolder } from '@/apis/folder/updateFolder';
import type { FolderRecordType } from '@/types/FolderRecordType';
import type { GetShareFolderListResponseType } from '@/types/GetShareFolderListResponseType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { folderKeys } from './folderKeys';

export function useUpdateFolderName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFolder,
    onMutate({ id, name }) {
      const prevFolders =
        queryClient.getQueryData<FolderRecordType>(folderKeys.root()) ?? {};
      const nextFolders = produce(prevFolders, (folders) => {
        if (folders[id]) {
          folders[id].name = name;
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
          return sharedFolderList.map((sharedFolderInfo) => {
            if (sharedFolderInfo.sourceFolderId === id) {
              const {
                folderAccessToken,
                sourceFolderCreatedAt,
                sourceFolderId,
                sourceFolderUpdatedAt,
              } = sharedFolderInfo;

              return {
                sourceFolderId,
                sourceFolderName: name,
                sourceFolderCreatedAt,
                sourceFolderUpdatedAt,
                folderAccessToken,
              };
            }

            return sharedFolderInfo;
          });
        },
      );
      queryClient.setQueryData(folderKeys.share(), nextSharedFolderList);

      return { prevFolders, prevSharedFolderList };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: folderKeys.root() });
    },
    onError(_error, _variables, context) {
      const prevFolders = context?.prevFolders ?? {};
      const prevSharedFolderList = context?.prevSharedFolderList ?? [];
      queryClient.setQueryData(folderKeys.root(), prevFolders);
      queryClient.setQueryData(folderKeys.share(), prevSharedFolderList);
    },
  });
}
