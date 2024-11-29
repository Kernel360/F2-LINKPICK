import Link from 'next/link';
import { CircleUserRoundIcon, SearchIcon } from 'lucide-react';
import { ROUTES } from '@/constants';
import { userMenuBarLayoutStyle } from './userMenuBar.css';

export function UserMenuBar() {
  return (
    <div className={userMenuBarLayoutStyle}>
      <Link href={ROUTES.MY_PAGE}>
        <CircleUserRoundIcon />
      </Link>

      <button>
        <SearchIcon />
      </button>
    </div>
  );
}
