import { movePicks } from '@/apis/pick/movePicks';
import type { PickListType } from '@/types/PickListType';
import type { UseMovePicksMutationFnParamType } from '@/types/UseMovePicksMutationFnParamType';
import { getMovedToEqualFolderPickList } from '@/utils/getMovedToEqualFolderPickList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { pickKeys } from './pickKeys';

export function useMovePicksToEqualFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ movePicksInfo }: UseMovePicksMutationFnParamType) =>
      movePicks(movePicksInfo),
    onMutate: async ({
      sourceFolderId,
      fromPickId,
      toPickId,
      movePicksInfo,
    }) => {
      await queryClient.cancelQueries({
        queryKey: pickKeys.folderId(sourceFolderId),
      });

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

      return { prevPickList };
    },
    onError: (_error, { sourceFolderId }, context) => {
      const prevPickList = context?.prevPickList ?? [];
      queryClient.setQueryData(pickKeys.folderId(sourceFolderId), prevPickList);
    },
    onSettled: (_data, _error, { sourceFolderId }) => {
      queryClient.invalidateQueries({
        queryKey: pickKeys.folderId(sourceFolderId),
      });
    },
  });
}
