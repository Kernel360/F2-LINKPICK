'use client';

import { createTag } from '@/apis/tag/createTag';
import type { TagType } from '@/types/TagType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tagKeys } from './tagKeys';

export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTag,
    onMutate({ name, colorNumber }) {
      const prevTagList =
        queryClient.getQueryData<TagType[]>(tagKeys.all) ?? [];
      const temporalUniqueId = -Date.now();
      const createdTag: TagType = {
        id: temporalUniqueId,
        name,
        colorNumber,
      };
      queryClient.setQueryData(tagKeys.all, [...prevTagList, createdTag]);

      return { prevTagList, temporalUniqueId };
    },
    onSuccess(data, _variables, context) {
      const { temporalUniqueId } = context;
      const prevTagList =
        queryClient.getQueryData<TagType[]>(tagKeys.all) ?? [];

      const tagList = prevTagList.map((tag) => {
        if (tag.id === temporalUniqueId) {
          return data;
        }
        return tag;
      });

      queryClient.setQueryData(tagKeys.all, tagList);
      queryClient.invalidateQueries({ queryKey: tagKeys.all });
    },
    onError(_error, _variables, context) {
      const prevTagList = context?.prevTagList ?? [];
      queryClient.setQueryData(tagKeys.all, prevTagList);
    },
  });
}
