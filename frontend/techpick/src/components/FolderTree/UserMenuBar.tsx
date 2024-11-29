import Link from 'next/link';
import { CircleUserRoundIcon, SearchIcon } from 'lucide-react';
import { ROUTES } from '@/constants';
import {
  userMenuBarLayoutStyle,
  myPageLinkStyle,
  searchButtonStyle,
} from './userMenuBar.css';

export function UserMenuBar() {
  return (
    <div className={userMenuBarLayoutStyle}>
      <Link href={ROUTES.MY_PAGE} className={myPageLinkStyle}>
        <CircleUserRoundIcon size={24} />
      </Link>

      <button className={searchButtonStyle}>
        <SearchIcon size={24} />
      </button>
    </div>
  );
}
