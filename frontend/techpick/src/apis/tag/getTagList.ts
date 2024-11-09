import { apiClient } from '@/apis';
import type { GetTagListResponseType } from '@/types';

export const getTagList = async () => {
  const response = await apiClient.get<GetTagListResponseType>('tags');
  const data = await response.json();

  return data;
};
