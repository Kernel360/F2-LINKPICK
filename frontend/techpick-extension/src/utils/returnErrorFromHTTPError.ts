import type { ApiErrorBodyType } from '@/types/ApiErrorBodyType';
import type { HTTPError } from 'ky';

export const returnErrorFromHTTPError = async (
  error: HTTPError,
): Promise<Error> => {
  const errorData = await error.response.json<ApiErrorBodyType>();

  if (errorData) {
    return new Error(`${errorData.code} ${errorData.message}`);
  }

  return new Error(`알 수 없는 에러: ${error.response.statusText}`);
};
