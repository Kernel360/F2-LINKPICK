import { deleteFolder } from '@/apis/folder/deleteFolder';
import type { FolderRecordType } from '@/types/FolderRecordType';
import type { GetShareFolderListResponseType } from '@/types/GetShareFolderListResponseType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { folderKeys } from './folderKeys';

// TODO 삭제시에 해당 휴지통 및 삭제하는 폴더에 대해서 지워야한다.
export function useDeleteFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFolder,
    onMutate(deleteFolderIdList) {
      const prevFolders =
        queryClient.getQueryData<FolderRecordType>(folderKeys.root()) ?? {};
      const nextFolders = produce(prevFolders, (draft) => {
        for (const deleteFolderId of deleteFolderIdList) {
          draft[deleteFolderId] = undefined;
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
              !deleteFolderIdList.includes(sharedFolderInfo.sourceFolderId),
          );
        },
      );
      queryClient.setQueryData(folderKeys.share(), nextSharedFolderList);

      return { prevFolders, prevSharedFolderList };
    },
    onSuccess() {
      // TODO: 여기서 휴지통 pick 새로고침과!, 지운 폴더 pick 새로 고침도 해야함?
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
