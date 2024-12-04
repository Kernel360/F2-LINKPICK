'use client';

import { postLogout } from '@/apis/postLogout';
import MyPageContentContainer from '@/components/MyPage/MyPageContentContainer';
import MyPageShareFolderContent from '@/components/MyPage/MyPageShareFolderContent';
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
      <MyPageContentContainer title="내 계정">
        <div>내 계정 정보</div>
      </MyPageContentContainer>
      <MyPageContentContainer title="공개된 폴더">
        <MyPageShareFolderContent />
      </MyPageContentContainer>
      <div className={buttonSectionLayout}>
        <button className={logoutButtonStyle} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
