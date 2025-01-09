import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { CreateTagRequestType, CreateTagResponseType } from '@/types';

export const createTag = async (createTag: CreateTagRequestType) => {
  const response = await apiClient.post<CreateTagResponseType>(
    API_URLS.CREATE_TAGS,
    {
      json: createTag,
    }
  );
  const data = await response.json();

  return data;
};
