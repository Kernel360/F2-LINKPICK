'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTag } from '@/apis/tag';
import { tagKeys } from './tagKeys';
import type { TagType } from '@/types';

export function useUpdateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTag,
    onMutate(updateTagInfo) {
      const prevTagList =
        queryClient.getQueryData<TagType[]>(tagKeys.all) ?? [];
      const tagList = prevTagList.map((tag) => {
        if (tag.id === updateTagInfo.id) {
          return updateTagInfo;
        }
        return tag;
      });

      queryClient.setQueryData(tagKeys.all, tagList);
      return { prevTagList };
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: tagKeys.all });
    },
    onError(_error, _variables, context) {
      const { prevTagList } = context!;
      queryClient.setQueryData(tagKeys.all, prevTagList);
    },
  });
}
