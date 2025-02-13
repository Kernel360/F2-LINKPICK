'use client';

import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import mixpanel from './mixpanel-client';

/**
 *
 * 유저를 식별합니다.
 */
export function UserIdentifyProvider({
  userId,
  children,
}: PropsWithChildren<UserIdentifyProviderProps>) {
  useEffect(() => {
    if (userId) {
      mixpanel.identify(userId);
    }
  }, [userId]);

  return children;
}

interface UserIdentifyProviderProps {
  userId: string | undefined;
}
