import type { GetSuggestionRankingPicksResponseType } from '@/types/GetSuggestionRankingPicksResponseType';
import { HTTPError } from 'ky';
import { apiClient } from './apiClient';
import { API_URLS } from './apiConstants';
import { returnErrorFromHTTPError } from './error';

export const getSuggestionRankingPicks = async () => {
  try {
    const response = await apiClient.get<GetSuggestionRankingPicksResponseType>(
      API_URLS.GET_SUGGESTION_RANKING_PICKS,
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
