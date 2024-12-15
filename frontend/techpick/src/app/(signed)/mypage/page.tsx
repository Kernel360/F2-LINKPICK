'use client';

import { useEffect } from 'react';
import { postLogout } from '@/apis/postLogout';
import { ImportBookmarkDialog } from '@/components/ImportBookmarkDialog';
import MyPageContentContainer from '@/components/MyPage/MyPageContentContainer';
import MyPageShareFolderContent from '@/components/MyPage/MyPageShareFolderContent';
import { TutorialReplaySwitch } from '@/components/TutorialReplaySwitch';
import { ROUTES } from '@/constants';
import { useTreeStore } from '@/stores';
import {
  buttonSectionStyle,
  logoutButtonStyle,
  myPageContentContainerLayoutStyle,
  myPageLayoutStyle,
  tutorialReplaySwitchLabelStyle,
  tutorialReplaySwitchLayoutStyle,
} from './page.css';

export default function MyPage() {
  const setFocusFolderId = useTreeStore((state) => state.setFocusFolderId);
  const setSelectedFolderList = useTreeStore(
    (state) => state.setSelectedFolderList
  );

  const handleLogout = async () => {
    try {
      await postLogout();
      window.location.replace(ROUTES.LOGIN);
    } catch {
      /* empty */
    }
  };

  useEffect(
    function clearFocusFolderId() {
      setFocusFolderId(null);
      setSelectedFolderList([]);
    },
    [setFocusFolderId, setSelectedFolderList]
  );

  return (
    <div className={myPageLayoutStyle}>
      <div className={myPageContentContainerLayoutStyle}>
        <MyPageContentContainer title="내 계정">
          <div className={buttonSectionStyle}>
            <ImportBookmarkDialog />
            <button className={logoutButtonStyle} onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </MyPageContentContainer>
        <div className={tutorialReplaySwitchLayoutStyle}>
          <label
            htmlFor="tutorial-replay-switch"
            className={tutorialReplaySwitchLabelStyle}
          >
            튜토리얼 다시 보기
          </label>
          <TutorialReplaySwitch labelTargetId="tutorial-replay-switch" />
        </div>
      </div>

      <MyPageContentContainer title="공개된 폴더">
        <MyPageShareFolderContent />
      </MyPageContentContainer>
    </div>
  );
}
