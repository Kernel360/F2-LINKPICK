'use client';

import { postLogout } from '@/apis/postLogout';
import { ImportBookmarkDialog } from '@/components/ImportBookmarkDialog';
import MyPageContentContainer from '@/components/MyPage/MyPageContentContainer';
import MyPageShareFolderContent from '@/components/MyPage/MyPageShareFolderContent';
import { TutorialDialog } from '@/components/TutorialDialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import { useEffect } from 'react';

import { ROUTES } from '@/constants/route';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import {
  buttonSectionStyle,
  checkboxIndicatorStyle,
  checkboxRootStyle,
  logoutButtonStyle,
  myPageContentContainerLayoutStyle,
  myPageLayoutStyle,
  tutorialReplayCheckboxLabelStyle,
  tutorialReplayCheckboxLayoutStyle,
} from './page.css';

export default function MyPage() {
  const setFocusFolderId = useTreeStore((state) => state.setFocusFolderId);
  const setSelectedFolderList = useTreeStore(
    (state) => state.setSelectedFolderList,
  );
  const { isOpen, onClose, onToggle } = useDisclosure();

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
    [setFocusFolderId, setSelectedFolderList],
  );

  return (
    <div className={myPageLayoutStyle}>
      <div className={myPageContentContainerLayoutStyle}>
        <MyPageContentContainer title="내 계정">
          <div className={buttonSectionStyle}>
            <ImportBookmarkDialog />
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button className={logoutButtonStyle} onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </MyPageContentContainer>
        <div className={tutorialReplayCheckboxLayoutStyle}>
          <Checkbox.Root
            id="tutorial-replay-checkbox"
            checked={isOpen}
            onCheckedChange={onToggle}
            className={checkboxRootStyle}
          >
            <Checkbox.Indicator className={checkboxIndicatorStyle}>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label
            htmlFor="tutorial-replay-checkbox"
            className={tutorialReplayCheckboxLabelStyle}
          >
            튜토리얼 다시 보기
          </label>
        </div>
        {isOpen && <TutorialDialog isOpen={isOpen} onClose={onClose} />}
      </div>

      <MyPageContentContainer title="공개된 폴더">
        <MyPageShareFolderContent />
      </MyPageContentContainer>
    </div>
  );
}
