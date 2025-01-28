'use client';

import { movePicks } from '@/apis/pick/movePicks';
import type { MutateOptionType } from '@/types/MutateOptionType';
import type { PickListType } from '@/types/PickListType';
import type { UseMovePicksMutationFnParamType } from '@/types/UseMovePicksMutationFnParamType';
import { getMovedToEqualFolderPickList } from '@/utils/getMovedToEqualFolderPickList';
import { useQueryClient } from '@tanstack/react-query';
import { pickKeys } from './pickKeys';

export function useMovePicksToEqualFolder() {
  const queryClient = useQueryClient();

  const mutate = async (
    movePicksParam: UseMovePicksMutationFnParamType,
    { onSuccess = () => {}, onError = () => {} }: MutateOptionType,
  ) => {
    const { toPickId, sourceFolderId, fromPickId, movePicksInfo } =
      movePicksParam;

    const prevPickList =
      queryClient.getQueryData<PickListType>(
        pickKeys.folderId(sourceFolderId),
      ) ?? [];

    const nextPickList = getMovedToEqualFolderPickList({
      prevPickList,
      fromPickId,
      toPickId,
      movePicksInfo,
    });

    queryClient.setQueryData(pickKeys.folderId(sourceFolderId), nextPickList);

    try {
      await movePicks(movePicksInfo);
      onSuccess();
    } catch {
      queryClient.setQueryData(pickKeys.folderId(sourceFolderId), prevPickList);
      onError();
    }

    queryClient.invalidateQueries({
      queryKey: pickKeys.folderId(sourceFolderId),
    });
  };

  return { mutate };
}
