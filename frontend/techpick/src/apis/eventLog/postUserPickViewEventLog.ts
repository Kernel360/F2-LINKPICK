import type { PostUserPickViewEventLogRequestType } from '@/types/PostUserPickViewEventLogRequestType';
import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';

export const postUserPickViewEventLog = async (
  requestInfo: PostUserPickViewEventLogRequestType,
) => {
  try {
    await apiClient.post(API_URLS.POST_USER_PICK_VIEW_EVENT_LOG, {
      json: requestInfo,
    });
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
