import * as Sentry from '@sentry/nextjs';
import ky, { HTTPError } from 'ky';
import { notifyError } from '@/utils';
import { ERROR_MESSAGE_JSON, returnErrorFromHTTPError } from './error';

export const apiClient = ky.create({
  credentials: 'include',
  prefixUrl: process.env.NEXT_PUBLIC_API,
  headers: { 'content-type': 'application/json' },
  hooks: {
    beforeError: [
      async (httpError) => {
        if (httpError instanceof HTTPError) {
          const error = await returnErrorFromHTTPError(httpError);
          Sentry.setContext('api_call', {
            url: httpError.request.url,
            method: httpError.request.method,
          });
          Sentry.captureException(error);
          const parsedErrorMessage = error.message.split(' ');
          const errorCode = parsedErrorMessage.shift();

          if (!errorCode) {
            /* empty */
          } else if (ERROR_MESSAGE_JSON[errorCode]) {
            notifyError(ERROR_MESSAGE_JSON[errorCode]);
          } else if (errorCode === 'PK-000') {
            // TODO: 익스텐션에서 가져왔습니다. PK-000은 다른 기능에서도 작동하기 때문에 수정해야 합니다.
            /* empty */
          } else if (errorCode === 'UNKNOWN') {
            notifyError('서버에서 알 수 없는 에러가 발생했습니다.');
          }
        }

        return httpError;
      },
    ],
  },
});
