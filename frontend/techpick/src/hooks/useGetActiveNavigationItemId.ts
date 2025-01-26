'use client';

import { ROUTES } from '@/constants/route';
import type { ActiveNavigationItemIdType } from '@/types/ActiveNavigationItemIdType';
import { usePathname } from 'next/navigation';

/**
 * url을 이용해, 어떤 폴더 혹은 페이지(추천, 마이페이지)가 선택되었는지 확인합니다.
 *
 */
export function useGetActiveNavigationItemId() {
  const pathname = usePathname();
  let activeNavigationItemId: ActiveNavigationItemIdType = null;

  switch (pathname) {
    case ROUTES.RECOMMEND: {
      activeNavigationItemId = 'recommend';
      break;
    }
    case ROUTES.LANDING: {
      activeNavigationItemId = 'mypage';
      break;
    }
    default: {
      const folderId = Number(pathname.split('/').slice(2).join(''));
      activeNavigationItemId = Number.isNaN(folderId) ? null : folderId;
    }
  }

  return { activeNavigationItemId };
}
