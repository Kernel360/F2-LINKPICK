'use client';

import { deletePicks } from '@/apis/pick/deletePicks';
import type { FolderIdType } from '@/types/FolderIdType';
import type { PickListType } from '@/types/PickListType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { pickKeys } from './pickKeys';

export function useDeletePicks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ deletePickIdList }: UseDeletePickMutationFnParam) =>
      deletePicks({ idList: deletePickIdList }),
    onMutate: async ({ recycleBinFolderId, deletePickIdList }) => {
      await queryClient.cancelQueries({
        queryKey: pickKeys.folderId(recycleBinFolderId),
      });

      const prevPickList =
        queryClient.getQueryData<PickListType>(
          pickKeys.folderId(recycleBinFolderId),
        ) ?? [];

      const updatedPickList = prevPickList.filter(
        (pick) => !deletePickIdList.includes(pick.id),
      );

      queryClient.setQueryData(
        pickKeys.folderId(recycleBinFolderId),
        updatedPickList,
      );

      return { prevPickList };
    },
    onError: (_error, { recycleBinFolderId }, context) => {
      const prevPickList = context?.prevPickList ?? [];

      queryClient.setQueryData(
        pickKeys.folderId(recycleBinFolderId),
        prevPickList,
      );
    },
    onSettled: (_data, _error, { recycleBinFolderId }) => {
      queryClient.invalidateQueries({
        queryKey: pickKeys.folderId(recycleBinFolderId),
      });
    },
  });
}

interface UseDeletePickMutationFnParam {
  recycleBinFolderId: FolderIdType;
  deletePickIdList: FolderIdType[];
}
