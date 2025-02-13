'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

/**
 * 서버 컴포넌트에서만 사용할 수 있습니다.
 * 이벤트 로그를 위해서 사용자를 식별할 때 사용할 uuid를 반환합니다.
 */
export const getUserIdForServer = async () => {
  const cookieStore = cookies();
  const access_token = cookieStore.get('access_token');
  const userId = access_token
    ? jwtDecode<AccessTokenInfoType>(access_token.value).id
    : undefined;

  return userId;
};

interface AccessTokenInfoType {
  id: string;
}
