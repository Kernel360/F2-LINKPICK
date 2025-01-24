'use client';

import { createFolder } from '@/apis/folder/createFolder';
import type { FolderRecordType } from '@/types/FolderRecordType';
import { addChildToParentFolder } from '@/utils/addChildToParentFolder';
import { geteTemporalFolderInfo } from '@/utils/createTemporalFolderInfo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { folderKeys } from './folderKeys';

export function useCreateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFolder,
    onMutate({ name, parentFolderId }) {
      const prevFolders =
        queryClient.getQueryData<FolderRecordType>(folderKeys.root()) ?? {};
      const temporalUniqueId = -Date.now();

      const nextFolders = produce(prevFolders, (draft) => {
        const temporalFolderInfo = geteTemporalFolderInfo({
          id: temporalUniqueId,
          name,
          parentFolderId,
        });
        draft[temporalUniqueId] = temporalFolderInfo;
        addChildToParentFolder({
          folderId: temporalUniqueId,
          folders: draft,
          parentFolderId,
        });
      });

      queryClient.setQueryData(folderKeys.root(), nextFolders);

      return { prevFolders };
    },
    onSuccess(data, _variables, context) {
      const prevFolders = context.prevFolders;

      const updatedFolders = produce(prevFolders, (draft) => {
        draft[data.id] = data;
        addChildToParentFolder({
          folderId: data.id,
          folders: draft,
          parentFolderId: data.parentFolderId,
        });
      });

      queryClient.setQueryData(folderKeys.root(), updatedFolders);
      queryClient.invalidateQueries({ queryKey: folderKeys.root() });
    },
    onError(_error, _variables, context) {
      const prevFolders = context?.prevFolders ?? {};
      queryClient.setQueryData(folderKeys.root(), prevFolders);
    },
  });
}
