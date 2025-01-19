'use client';

import { deleteTag } from '@/apis/tag/deleteTag';
import type { TagType } from '@/types/TagType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tagKeys } from './tagKeys';

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
      const prevTagList = context?.prevTagList ?? [];
      queryClient.setQueryData(tagKeys.all, prevTagList);
    },
  });
}
