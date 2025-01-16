'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTag } from '@/apis/tag';
import { tagKeys } from './tagKeys';
import type { TagType } from '@/types';

export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTag,
    onMutate(deleteTagId) {
      const prevTagList =
        queryClient.getQueryData<TagType[]>(tagKeys.all) ?? [];
      const nextTagList = prevTagList.filter((tag) => tag.id !== deleteTagId);
      queryClient.setQueryData(tagKeys.all, nextTagList);

      return { prevTagList };
    },
    onError(_error, _variables, context) {
      const { prevTagList } = context!;
      queryClient.setQueryData(tagKeys.all, prevTagList);
    },
  });
}
