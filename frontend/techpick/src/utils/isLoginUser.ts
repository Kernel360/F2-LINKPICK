'use server';

import { cookies } from 'next/headers';

/**
 * @description cookie에 접근해서 로그인 유무를 판단하는 함수입니다.
 */
export const isLoginUser = async () => {
  const cookieStore = cookies();
  const accessToken = await cookieStore.get('access_token');

  return accessToken !== undefined;
};
