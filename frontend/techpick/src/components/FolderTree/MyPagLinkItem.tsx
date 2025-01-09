import Link from 'next/link';
import { CircleUserRoundIcon } from 'lucide-react';
import { ROUTES } from '@/constants';
import { navItemStyle, topBorderColor } from './myPagLinkItem.css';

export function MyPageLinkItem() {
  return (
    <div className={topBorderColor}>
      <Link href={ROUTES.MY_PAGE} className={navItemStyle}>
        <CircleUserRoundIcon size={16} />
        <span>마이페이지</span>
      </Link>
    </div>
  );
}
