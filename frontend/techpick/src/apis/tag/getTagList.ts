import { apiClient } from '@/apis';
import type { GetTagListResponseType } from '@/types';

export const getTagList = async () => {
  const response = await apiClient.get<GetTagListResponseType>('tag');
  const data = await response.json();

  return data;
};
