'use client';

import { movePicks } from '@/apis/pick/movePicks';
import type { PickListType } from '@/types/PickListType';
import type { UseMovePicksMutationFnParamType } from '@/types/UseMovePicksMutationFnParamType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { pickKeys } from './pickKeys';

export function useMovePicksToDifferentFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ movePicksInfo }: UseMovePicksMutationFnParamType) =>
      movePicks(movePicksInfo),
    onMutate: async ({ sourceFolderId, movePicksInfo }) => {
      const { idList, destinationFolderId } = movePicksInfo;
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: pickKeys.folderId(sourceFolderId),
        }),
        queryClient.cancelQueries({
          queryKey: pickKeys.folderId(destinationFolderId),
        }),
      ]);

      const prevSourcePickList =
        queryClient.getQueryData<PickListType>(
          pickKeys.folderId(sourceFolderId),
        ) ?? [];

      const movedPickList = prevSourcePickList.filter((pickInfo) =>
        idList.includes(pickInfo.id),
      );
      const nextSourcePickList = prevSourcePickList.filter(
        (pickInfo) => !idList.includes(pickInfo.id),
      );

      queryClient.setQueryData(
        pickKeys.folderId(sourceFolderId),
        nextSourcePickList,
      );

      const prevDestinationPickList =
        queryClient.getQueryData<PickListType>(
          pickKeys.folderId(destinationFolderId),
        ) ?? [];

      const nextDestinationPickList = [
        ...movedPickList,
        ...prevDestinationPickList,
      ];

      queryClient.setQueryData(
        pickKeys.folderId(destinationFolderId),
        nextDestinationPickList,
      );

      return { prevSourcePickList, prevDestinationPickList };
    },
    onError(_error, { sourceFolderId, movePicksInfo }, context) {
      const prevSourcePickList = context?.prevSourcePickList ?? [];
      const prevDestinationPickList = context?.prevDestinationPickList ?? [];
      queryClient.setQueryData(
        pickKeys.folderId(sourceFolderId),
        prevSourcePickList,
      );
      queryClient.setQueryData(
        pickKeys.folderId(movePicksInfo.destinationFolderId),
        prevDestinationPickList,
      );
    },
    onSettled: (_data, _error, { sourceFolderId, movePicksInfo }) => {
      queryClient.invalidateQueries({
        queryKey: pickKeys.folderId(sourceFolderId),
      });
      queryClient.invalidateQueries({
        queryKey: pickKeys.folderId(movePicksInfo.destinationFolderId),
      });
    },
  });
}
