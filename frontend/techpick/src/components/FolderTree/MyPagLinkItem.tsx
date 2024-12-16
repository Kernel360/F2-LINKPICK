import Link from 'next/link';
import { CircleUserRoundIcon } from 'lucide-react';
import { ROUTES } from '@/constants';
import { navItemStyle } from './myPagLinkItem.css';

export function MyPageLinkItem() {
  return (
    <div>
      <Link href={ROUTES.MY_PAGE} className={navItemStyle}>
        <CircleUserRoundIcon size={16} />
        <span>마이페이지</span>
      </Link>
    </div>
  );
}
