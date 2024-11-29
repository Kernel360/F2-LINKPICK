'use client';

import { postLogout } from '@/apis/postLogout';
import { ROUTES } from '@/constants';
import {
  buttonSectionLayout,
  logoutButtonStyle,
  myPageLayoutStyle,
} from './page.css';

export default function MyPage() {
  const handleLogout = async () => {
    try {
      await postLogout();
      window.location.replace(ROUTES.LOGIN);
    } catch {
      /* empty */
    }
  };

  return (
    <div className={myPageLayoutStyle}>
      <div className={buttonSectionLayout}>
        <button className={logoutButtonStyle} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
