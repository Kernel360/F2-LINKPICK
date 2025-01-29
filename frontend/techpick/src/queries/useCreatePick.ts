'use client';

import { createPick } from '@/apis/pick/createPick';
import type { PickListType } from '@/types/PickListType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { pickKeys } from './pickKeys';

export function useCreatePick() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPick,
    onSuccess(data) {
      const prevPickList =
        queryClient.getQueryData<PickListType>(
          pickKeys.folderId(data.parentFolderId),
        ) ?? [];
      const nextPickList = [data, ...prevPickList];
      queryClient.setQueryData(
        pickKeys.folderId(data.parentFolderId),
        nextPickList,
      );
    },
    onSettled(_data, _error, variables) {
      queryClient.invalidateQueries({
        queryKey: pickKeys.folderId(variables.parentFolderId),
      });
    },
  });
}
