'use client';

import { ROUTES } from '@/constants/route';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useGetActiveNavigationItemId } from '@/hooks/useGetActiveNavigationItemId';
import { useFetchFoldersWithBasicFolders } from '@/queries/useFetchFoldersWithBasicFolders';
import { CircleUserRoundIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { SearchDrawer } from './Search2/SearchDrawer';
import {
  actionsStyle,
  buttonStyle,
  mobileNavigationBarStyle,
} from './mobileNavigationBar.css';

export function MobileNavigationBar() {
  const { activeNavigationItemId } = useGetActiveNavigationItemId();
  const { isOpen, setIsOpen, onOpen } = useDisclosure();
  const { data: folderList = [] } = useFetchFoldersWithBasicFolders();

  let currentPageTitle = '';

  switch (activeNavigationItemId) {
    case 'recommend': {
      currentPageTitle = '추천';
      break;
    }
    case 'mypage': {
      currentPageTitle = '마이 페이지';
      break;
    }
    case null: {
      currentPageTitle = '알 수 없는 페이지';
      break;
    }
    default: {
      currentPageTitle =
        folderList.filter((folder) => folder.id === activeNavigationItemId)[0]
          ?.name ?? '알 수 없는 페이지';
    }
  }

  return (
    <header className={mobileNavigationBarStyle}>
      <h1>{currentPageTitle}</h1>
      <div className={actionsStyle}>
        <div className={buttonStyle}>
          <SearchIcon size={26} onClick={onOpen} />
          <SearchDrawer isOpen={isOpen} onOpenChange={setIsOpen} />
        </div>
        <Link href={ROUTES.MY_PAGE} className={buttonStyle}>
          <CircleUserRoundIcon size={26} />
        </Link>
      </div>
    </header>
  );
}
