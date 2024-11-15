import ky, { HTTPError } from 'ky';
import { notifyError } from '@/libs/@toast';
import { returnErrorFromHTTPError } from '@/utils';

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
          const errorMessage = parsedErrorMessage.join(' ');

          if (!errorCode) {
            notifyError('알 수 없는 에러가 발생했습니다.');
            console.log(errorCode, errorMessage);
          } else if (errorCode === 'PK-000') {
            console.log(errorCode, errorMessage);
          }
        } else {
          console.log('error check in afterResponse', httpError);
          notifyError('알 수 없는 에러가 발생했습니다.');
        }

        return httpError;
      },
    ],
  },
});
