import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import { API_URLS } from '../apiConstants';
import type { MovePicksRequestType } from '@/types';

export const movePicks = async (movePicksInfo: MovePicksRequestType) => {
  try {
    await apiClient.patch(API_URLS.MOVE_PICKS, { json: movePicksInfo });
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
