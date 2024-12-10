import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';
import type { PostSharedPickViewEventLogRequestType } from '@/types';

export const postSharedPickViewEventLog = async (
  requestInfo: PostSharedPickViewEventLogRequestType
) => {
  try {
    await apiClient.post(API_URLS.POST_SHARED_PICK_VIEW_EVENT_LOG, {
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
