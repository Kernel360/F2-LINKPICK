'use client';

import mixpanel from '@/libs/mixpanel-client';
import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';

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
