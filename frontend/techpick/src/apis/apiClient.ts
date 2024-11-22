import ky from 'ky';
import { notifyError } from '@/utils';
import type { ApiErrorBody } from './error';

export const apiClient = ky.create({
  credentials: 'include',
  prefixUrl: process.env.NEXT_PUBLIC_API,
  headers: { 'content-type': 'application/json' },
  hooks: {
    afterResponse: [
      async (_input, _options, response) => {
        if (!response.ok) {
          const data = await response.json<ApiErrorBody>();
          console.log('error check in afterResponse', data);
          notifyError('알 수 없는 에러가 발생했습니다.');
        }
      },
    ],
  },
});
