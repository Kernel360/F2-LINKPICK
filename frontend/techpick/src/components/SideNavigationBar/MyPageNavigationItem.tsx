'use client';

import { ROUTES } from '@/constants/route';
import { CircleUserRoundIcon } from 'lucide-react';
import { useContext } from 'react';
import { ActiveNavigationItemIdContext } from './ActiveNavigationItemIdProvider';
import { NavigationItem } from './NavigationItem';

export function MyPageNavigationItem() {
  const activeNavigationItemId = useContext(ActiveNavigationItemIdContext);
  const isActive = activeNavigationItemId === 'mypage';

  return (
    <NavigationItem
      href={ROUTES.MY_PAGE}
      text="마이페이지"
      icon={CircleUserRoundIcon}
      isActive={isActive}
    />
  );
}
