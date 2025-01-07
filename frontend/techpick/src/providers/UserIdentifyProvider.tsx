'use client';

import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import mixpanel from '@/libs/mixpanel-client';

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
  userId: string;
}
