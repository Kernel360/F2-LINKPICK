import ky, { HTTPError } from 'ky';
import { notifyError } from '@/libs/@toast';
import { returnErrorFromHTTPError } from '@/utils';
import { ERROR_MESSAGE_JSON } from '@/constants';

/**
 * @Todo api 주소와 query param을 따로 받을 수 있게 추가.
 */
export const apiClient = ky.create({
  credentials: 'include',
  prefixUrl: import.meta.env.VITE_PUBLIC_API,
  headers: { 'content-type': 'application/json' },
  hooks: {
    beforeError: [
      async (httpError) => {
        if (httpError instanceof HTTPError) {
          const error = await returnErrorFromHTTPError(httpError);
          const parsedErrorMessage = error.message.split(' ');
          const errorCode = parsedErrorMessage.shift();

          if (!errorCode) {
            /* empty */
          } else if (ERROR_MESSAGE_JSON[errorCode]) {
            notifyError(ERROR_MESSAGE_JSON[errorCode]);
          } else if (errorCode === 'PK-000') {
            /* empty */
          }
        }

        return httpError;
      },
    ],
  },
});
