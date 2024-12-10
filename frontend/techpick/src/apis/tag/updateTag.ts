import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { UpdateTagRequestType, UpdateTagResponseType } from '@/types';

export const updateTag = async (updateTag: UpdateTagRequestType) => {
  await apiClient.patch<UpdateTagResponseType>(API_URLS.UPDATE_TAGS, {
    json: updateTag,
  });
};
