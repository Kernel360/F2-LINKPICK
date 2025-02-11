'use client';

import { ROUTES } from '@/constants/route';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useGetActiveNavigationItemId } from '@/hooks/useGetActiveNavigationItemId';
import { useFetchFoldersWithBasicFolders } from '@/queries/useFetchFoldersWithBasicFolders';
import { CircleUserRoundIcon, MenuIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { FolderNavigationDrawer } from './FolderNavigationDrawer';
import { SearchDrawer } from './Search2/SearchDrawer';
import {
  actionsStyle,
  buttonStyle,
  mobileNavigationBarStyle,
  titleSectionStyle,
  titleStyle,
} from './mobileNavigationBar.css';

export function MobileNavigationBar() {
  const { activeNavigationItemId } = useGetActiveNavigationItemId();
  const { data: folderList = [] } = useFetchFoldersWithBasicFolders();
  const {
    isOpen: isFolderNavigationDrawerOpen,
    setIsOpen: setIsFolderNavigationDrawerOpen,
    onOpen: onFolderNavigationDrawer,
  } = useDisclosure();
  const {
    isOpen: isSearchDrawerOpen,
    setIsOpen: setIsSearchDrawerOpen,
    onOpen: onOpenSearchDrawer,
  } = useDisclosure();

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
      <div className={titleSectionStyle}>
        <div className={buttonStyle}>
          <MenuIcon size={26} onClick={onFolderNavigationDrawer} />
          <FolderNavigationDrawer
            isOpen={isFolderNavigationDrawerOpen}
            onOpenChange={setIsFolderNavigationDrawerOpen}
          />
        </div>
        <h1 className={titleStyle}>{currentPageTitle}</h1>
      </div>

      <div className={actionsStyle}>
        <div className={buttonStyle}>
          <SearchIcon size={26} onClick={onOpenSearchDrawer} />
          <SearchDrawer
            isOpen={isSearchDrawerOpen}
            onOpenChange={setIsSearchDrawerOpen}
          />
        </div>
        <Link href={ROUTES.MY_PAGE} className={buttonStyle}>
          <CircleUserRoundIcon size={26} />
        </Link>
      </div>
    </header>
  );
}
