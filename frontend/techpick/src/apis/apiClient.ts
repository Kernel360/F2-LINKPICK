import * as Sentry from '@sentry/nextjs';
import ky, { HTTPError } from 'ky';
import { ERROR_MESSAGE_JSON } from '@/constants';
import { notifyError } from '@/utils';
import { returnErrorFromHTTPError } from './error';

export const apiClient = ky.create({
  credentials: 'include',
  prefixUrl: process.env.NEXT_PUBLIC_API,
  cache: 'no-store',
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
          }
        }

        return httpError;
      },
    ],
  },
});
