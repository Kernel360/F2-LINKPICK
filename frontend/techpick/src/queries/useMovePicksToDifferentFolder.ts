'use client';

import { movePicks } from '@/apis/pick/movePicks';
import type { MutateOptionType } from '@/types/MutateOptionType';
import type { PickListType } from '@/types/PickListType';
import type { UseMovePicksMutationFnParamType } from '@/types/UseMovePicksMutationFnParamType';
import { useQueryClient } from '@tanstack/react-query';
import { pickKeys } from './pickKeys';

export function useMovePicksToDifferentFolder() {
  const queryClient = useQueryClient();

  const mutate = async (
    movePickParam: Omit<UseMovePicksMutationFnParamType, 'toPickId'>,
    afterMutate: MutateOptionType = { onSuccess: () => {}, onError: () => {} },
  ) => {
    const { movePicksInfo, sourceFolderId } = movePickParam;
    const { onSuccess = () => {}, onError = () => {} } = afterMutate;
    const { destinationFolderId } = movePicksInfo;

    const prevSourcePickList =
      queryClient.getQueryData<PickListType>(
        pickKeys.folderId(sourceFolderId),
      ) ?? [];

    const movedPickSet = new Set(movePicksInfo.idList);
    const movedPickList: PickListType = [];
    const nextSourcePickList: PickListType = [];

    for (const pickInfo of prevSourcePickList) {
      if (movedPickSet.has(pickInfo.id)) {
        movedPickList.push(pickInfo);
      } else {
        nextSourcePickList.push(pickInfo);
      }
    }

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

    try {
      await movePicks(movePicksInfo);
      onSuccess();
    } catch {
      queryClient.setQueryData(
        pickKeys.folderId(sourceFolderId),
        prevSourcePickList,
      );
      queryClient.setQueryData(
        pickKeys.folderId(movePicksInfo.destinationFolderId),
        prevDestinationPickList,
      );
      onError();
    }

    queryClient.invalidateQueries({
      queryKey: pickKeys.folderId(sourceFolderId),
    });
    queryClient.invalidateQueries({
      queryKey: pickKeys.folderId(movePicksInfo.destinationFolderId),
    });
  };

  return { mutate };
}
