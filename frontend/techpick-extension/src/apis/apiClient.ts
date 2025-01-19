import { ERROR_MESSAGE_JSON } from '@/constants/errorMessageJson';
import { notifyError } from '@/libs/@toast/notifyError';
import { returnErrorFromHTTPError } from '@/utils/returnErrorFromHTTPError';
import ky, { HTTPError } from 'ky';

export const apiClient = ky.create({
  credentials: 'include',
  prefixUrl: import.meta.env.VITE_PUBLIC_API,
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
          } else if (errorCode === 'UNKNOWN') {
            notifyError('서버에서 알 수 없는 에러가 발생했습니다.');
          }
        }

        return httpError;
      },
    ],
  },
});
