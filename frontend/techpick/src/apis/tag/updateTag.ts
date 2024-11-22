import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { UpdateTagRequestType, UpdateTagResponseType } from '@/types';

export const updateTag = async (updateTag: UpdateTagRequestType) => {
  const response = await apiClient.put<UpdateTagResponseType>(
    API_URLS.UPDATE_TAGS,
    {
      json: [updateTag],
    }
  );
  const updatedTag = await response.json();

  return updatedTag;
};
