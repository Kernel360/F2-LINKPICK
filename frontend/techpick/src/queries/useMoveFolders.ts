'use client';

import { moveFoldersMutation } from '@/apis/folder/moveFoldersMutation';
import type { FolderRecordType } from '@/types/FolderRecordType';
import type { MutateOptionType } from '@/types/MutateOptionType';
import type { UseMoveFoldersMutationParamType } from '@/types/UseMoveFoldersMutationParamType';
import { moveFoldersToDifferentParentFolder } from '@/utils/moveFoldersDifferentParentFolder';
import { moveFoldersToSameParentFolder } from '@/utils/moveFoldersToSameParentFolder';
import { useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { folderKeys } from './folderKeys';

// export function useMoveFolders() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: moveFoldersMutation,
//     onMutate: async ({
//       parentFolderId,
//       idList,
//       destinationFolderId,
//       fromId,
//       toId,
//     }) => {
//       await queryClient.cancelQueries({ queryKey: folderKeys.root() });

//       const prevFolders =
//         queryClient.getQueryData<FolderRecordType>(folderKeys.root()) ?? {};

//       const nextFolders = produce(prevFolders, (draft) => {
//         // 부모 폴더가 같을 때.
//         if (parentFolderId === destinationFolderId && draft[parentFolderId]) {
//           moveFoldersToSameParentFolder({
//             fromId,
//             idList,
//             nextFolders: draft,
//             parentFolderId,
//             toId,
//           });
//         }

//         // 부모 폴더가 다를 때.
//         if (
//           parentFolderId !== destinationFolderId &&
//           draft[parentFolderId] &&
//           draft[destinationFolderId]
//         ) {
//           moveFoldersToDifferentParentFolder({
//             destinationFolderId,
//             idList,
//             nextFolders: draft,
//             parentFolderId,
//             toId,
//           });
//         }
//       });

//       queryClient.setQueryData(folderKeys.root(), nextFolders);
//       return { prevFolders };
//     },
//     onSuccess() {},
//     onError(_error, _variables, context) {
//       const prevFolders = context?.prevFolders ?? {};
//       queryClient.setQueryData(folderKeys.root(), prevFolders);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: folderKeys.root() });
//     },
//   });
// }

export function useMoveFolders() {
  const queryClient = useQueryClient();

  const mutate = async (
    moveFoldersParam: UseMoveFoldersMutationParamType,
    afterMutate: MutateOptionType = { onSuccess: () => {}, onError: () => {} },
  ) => {
    const { destinationFolderId, fromId, idList, parentFolderId, toId } =
      moveFoldersParam;
    const { onSuccess = () => {}, onError = () => {} } = afterMutate;
    const prevFolders =
      queryClient.getQueryData<FolderRecordType>(folderKeys.root()) ?? {};

    const nextFolders = produce(prevFolders, (draft) => {
      // 부모 폴더가 같을 때.
      if (parentFolderId === destinationFolderId && draft[parentFolderId]) {
        moveFoldersToSameParentFolder({
          fromId,
          idList,
          nextFolders: draft,
          parentFolderId,
          toId,
        });
      }

      // 부모 폴더가 다를 때.
      if (
        parentFolderId !== destinationFolderId &&
        draft[parentFolderId] &&
        draft[destinationFolderId]
      ) {
        moveFoldersToDifferentParentFolder({
          destinationFolderId,
          idList,
          nextFolders: draft,
          parentFolderId,
          toId,
        });
      }
    });

    queryClient.setQueryData(folderKeys.root(), nextFolders);

    try {
      await moveFoldersMutation(moveFoldersParam);
      onSuccess();
    } catch {
      onError();
    }

    queryClient.invalidateQueries({ queryKey: folderKeys.root() });
  };

  return { mutate };
}
