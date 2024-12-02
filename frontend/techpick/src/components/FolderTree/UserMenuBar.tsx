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
        <CircleUserRoundIcon size={20} />
      </Link>

      <button className={searchButtonStyle}>
        <SearchIcon size={20} />
      </button>
    </div>
  );
}
