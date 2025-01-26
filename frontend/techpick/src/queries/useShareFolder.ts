'use client';

import { shareFolder } from '@/apis/folder/shareFolder';
import type { FolderRecordType } from '@/types/FolderRecordType';
import type { GetShareFolderListResponseType } from '@/types/GetShareFolderListResponseType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { folderKeys } from './folderKeys';

export function useShareFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: shareFolder,
    onMutate() {
      const prevFolders =
        queryClient.getQueryData<FolderRecordType>(folderKeys.root()) ?? {};
      const prevSharedFolderList =
        queryClient.getQueryData<GetShareFolderListResponseType>(
          folderKeys.share(),
        ) ?? [];

      return { prevFolders, prevSharedFolderList };
    },
    onSuccess({ folderAccessToken }, folderId, context) {
      const { prevFolders, prevSharedFolderList } = context;

      const nextFolders = produce(prevFolders, (draft) => {
        if (draft[folderId]) {
          draft[folderId].folderAccessToken = folderAccessToken;
        }
      });

      const nextSharedFolderList = produce(
        prevSharedFolderList,
        (sharedFolderList) => {
          if (nextFolders[folderId]) {
            const { createdAt, updatedAt, name } = nextFolders[folderId];
            sharedFolderList.push({
              folderAccessToken,
              sourceFolderCreatedAt: createdAt,
              sourceFolderUpdatedAt: updatedAt,
              sourceFolderId: folderId,
              sourceFolderName: name,
            });
          }
        },
      );

      queryClient.setQueryData(folderKeys.root(), nextFolders);
      queryClient.setQueryData(folderKeys.share(), nextSharedFolderList);

      queryClient.invalidateQueries({ queryKey: folderKeys.root() });
      queryClient.invalidateQueries({ queryKey: folderKeys.share() });

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
