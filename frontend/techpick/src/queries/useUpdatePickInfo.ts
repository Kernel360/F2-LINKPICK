'use client';

import { updatePick } from '@/apis/pick/updatePick';
import type { FolderIdType } from '@/types/FolderIdType';
import type { PickListType } from '@/types/PickListType';
import type { UpdatePickRequestType } from '@/types/UpdatePickRequestType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { pickKeys } from './pickKeys';

export function useUpdatePickInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ updatePickInfo }: UseUpdatePickInfoMutationFnParam) =>
      updatePick(updatePickInfo),
    onMutate: async ({ pickParentFolderId, updatePickInfo }) => {
      await queryClient.cancelQueries({
        queryKey: pickKeys.folderId(pickParentFolderId),
      });

      const prevPickList =
        queryClient.getQueryData<PickListType>(
          pickKeys.folderId(pickParentFolderId),
        ) ?? [];

      const nextPickList = prevPickList.map((pickInfo) => {
        if (pickInfo.id === updatePickInfo.id) {
          return {
            ...pickInfo,
            ...updatePickInfo,
          };
        }

        return pickInfo;
      });

      queryClient.setQueryData(
        pickKeys.folderId(pickParentFolderId),
        nextPickList,
      );

      return { prevPickList };
    },
    onError(_error, { pickParentFolderId }, context) {
      const prevPickList = context?.prevPickList ?? [];

      queryClient.setQueryData(
        pickKeys.folderId(pickParentFolderId),
        prevPickList,
      );
    },
    onSettled: (_data, _error, { pickParentFolderId }) => {
      queryClient.invalidateQueries({
        queryKey: pickKeys.folderId(pickParentFolderId),
      });
    },
  });
}

interface UseUpdatePickInfoMutationFnParam {
  pickParentFolderId: FolderIdType;
  updatePickInfo: UpdatePickRequestType;
}
