'use client';
import { useGetActiveNavigationItemId } from '@/hooks/useGetActiveNavigationItemId';
import type { ActiveNavigationItemIdType } from '@/types/ActiveNavigationItemIdType';
import type { PropsWithChildren } from 'react';
import { createContext } from 'react';

export const ActiveNavigationItemIdContext =
  createContext<ActiveNavigationItemIdType>(null);

/**
 * url을 이용해, 어떤 폴더 혹은 페이지가 선택되었는지 확인합니다.
 *
 * `ActiveNavigationItemIdContext` 로 값을 받아올 수 있습니다.
 */
export function ActiveNavigationItemIdProvider({
  children,
}: PropsWithChildren) {
  const { activeNavigationItemId } = useGetActiveNavigationItemId();

  return (
    <ActiveNavigationItemIdContext.Provider value={activeNavigationItemId}>
      {children}
    </ActiveNavigationItemIdContext.Provider>
  );
}
