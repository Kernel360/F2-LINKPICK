'use client';

import { useCallback } from 'react';
import mixpanel from './mixpanel-client';

/**
 * 로컬 저장소에 담긴 유저 인식 정보가 지워집니다.
 *
 * 유저의 기록을 초기화할 때 사용합니다.
 */
export function useUserSessionReset() {
  const userSessionReset = useCallback(() => {
    mixpanel.reset();
  }, []);

  return { userSessionReset };
}
