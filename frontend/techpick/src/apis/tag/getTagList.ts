import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import type { GetTagListResponseType } from '@/types';

export const getTagList = async () => {
  const response = await apiClient.get<GetTagListResponseType>(
    API_URLS.GET_TAGS
  );
  const data = await response.json();

  return data;
};
