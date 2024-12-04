import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';
import type { PostClickedLinkUrlResponseType } from '@/types';

export const postClickedLinkUrl = async (url: string) => {
  try {
    const response = await apiClient.post<PostClickedLinkUrlResponseType>(
      API_URLS.POST_CLICKED_LINK_URL(encodeURIComponent(url))
    );
    const data = await response.json();

    return data;
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
