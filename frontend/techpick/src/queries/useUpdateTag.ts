'use client';

import { updateTag } from '@/apis/tag/updateTag';
import type { TagType } from '@/types/TagType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tagKeys } from './tagKeys';

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
      const prevTagList = context?.prevTagList ?? [];
      queryClient.setQueryData(tagKeys.all, prevTagList);
    },
  });
}
