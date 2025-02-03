import type { GetSuggestionBlogArticleListResponseType } from '@/types/GetSuggestionBlogArticleListResponseType';
import { HTTPError } from 'ky';
import { apiClient } from './apiClient';
import { API_URLS } from './apiConstants';
import { returnErrorFromHTTPError } from './error';

export const getSuggestionBlogArticleList = async () => {
  try {
    const response =
      await apiClient.get<GetSuggestionBlogArticleListResponseType>(
        API_URLS.GET_SUGGESTION_BLOG_ARTICLES,
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
