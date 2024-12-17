import ky, { HTTPError } from 'ky';
import { notifyError } from '@/libs/@toast';
import { returnErrorFromHTTPError } from '@/utils';
import { ERROR_MESSAGE_JSON } from '@/constants';

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
