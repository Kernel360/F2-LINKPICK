import type { MovePicksRequestType } from '@/types/MovePicksRequestType';
import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';

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
