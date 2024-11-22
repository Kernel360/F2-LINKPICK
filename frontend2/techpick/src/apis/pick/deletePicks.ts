import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';
import { PickDeleteRequestType } from '@/types';

export const deletePicks = async (deletePicksInfo: PickDeleteRequestType) => {
  try {
    await apiClient.delete(API_URLS.DELETE_PICKS, { json: deletePicksInfo });
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
