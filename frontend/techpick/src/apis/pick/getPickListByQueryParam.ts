import type { SearchPicksResponseType } from '@/types/SearchPicksResponseType';
import type { SearchQueryParamType } from '@/types/SearchQueryParamType';
import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';

export const getPickListByQueryParam = async (
  queryParam: SearchQueryParamType,
  cursor?: number | string,
  size?: number,
): Promise<SearchPicksResponseType> => {
  try {
    const URL = API_URLS.SEARCH_PICKS_BY_QUERY_PARAM(queryParam, cursor, size);
    const response = await apiClient.get<SearchPicksResponseType>(URL);
    const data = await response.json();

    return data as SearchPicksResponseType;
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
