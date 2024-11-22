import { HTTPError } from 'ky';
import { ApiErrorBodyType } from '@/types';

export const returnErrorFromHTTPError = async (
  error: HTTPError
): Promise<Error> => {
  const errorData = await error.response.json<ApiErrorBodyType>();

  if (errorData) {
    return new Error(`${errorData.code} ${errorData.message}`);
  }

  return new Error(`알 수 없는 에러: ${error.response.statusText}`);
};
