'use client';

import { IS_TUTORIAL_SEEN_LOCAL_STORAGE_KEY } from '@/constants/isTutorialSeenLocalStorageKey';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { dialogOverlayStyle } from '@/styles/dialogStyle.css';
import { mobileLinBreakStyle } from '@/styles/mobileLinBreakStyle.css';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useRef, useState } from 'react';
import {
  dialogContent,
  mobileTextUnderlineStyle,
  outlineButtonStyle,
  pointTextStyle,
  solidButtonStyle,
  tabContentDescriptionStyle,
  tabContentStyle,
  tabListStyle,
  tabRootStyle,
  tabTriggerLayoutStyle,
  videoStyle,
} from './tutorialDialog.css';

const tutorialStepList = [
  'tutorial-step-1',
  'tutorial-step-2',
  'tutorial-step-3',
] as const;
type TutorialStepType = (typeof tutorialStepList)[number];

export function TutorialDialog({ isOpen, onClose }: TutorialDialogProps) {
  const [tutorialStep, setTutorialStep] = useState<TutorialStepType>(
    tutorialStepList[0],
  );
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { setValue: setIsTutorialSeen } = useLocalStorage(
    IS_TUTORIAL_SEEN_LOCAL_STORAGE_KEY,
    false,
  );

  const onValueChange = (value: string) => {
    setTutorialStep(value as TutorialStepType);
  };

  const handleMouseEnter = (ref: React.RefObject<HTMLButtonElement>) => {
    ref.current?.focus();
  };

  const onCloseTutorial = () => {
    setIsTutorialSeen(true);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} modal>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogOverlayStyle} />
        <Dialog.Content className={dialogContent}>
          <VisuallyHidden.Root>
            <Dialog.Title>튜토리얼</Dialog.Title>
            <Dialog.Description>튜토리얼 설명입니다.</Dialog.Description>
          </VisuallyHidden.Root>
          <Tabs.Root
            value={tutorialStep}
            onValueChange={onValueChange}
            activationMode={'manual'}
            className={tabRootStyle}
          >
            <Tabs.Content
              value={tutorialStepList[0]}
              className={tabContentStyle}
            >
              <p className={tabContentDescriptionStyle}>
                <a
                  href="https://chromewebstore.google.com/detail/%EB%B0%94%EA%B5%AC%EB%8B%88-%EC%9D%B5%EC%8A%A4%ED%85%90%EC%85%98/gfkkgllophliamkdclhekgfiohnbdddl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span
                    className={`${pointTextStyle} ${mobileTextUnderlineStyle}`}
                  >
                    해당 링크
                  </span>
                  를 누르시거나 <span className={mobileLinBreakStyle} />
                </a>{' '}
                <span className={pointTextStyle}>바구니 익스텐션</span> 설치해서
                북마크하세요!
              </p>

              <video
                src="/video/saveBookmark.mp4"
                autoPlay
                muted
                playsInline
                loop
                className={videoStyle}
              />
            </Tabs.Content>

            <Tabs.Content
              value={tutorialStepList[1]}
              className={tabContentStyle}
            >
              <p className={tabContentDescriptionStyle}>
                <span className={pointTextStyle}>추천 페이지</span>에서{' '}
                <span className={mobileLinBreakStyle} />
                원하는 걸<span className={pointTextStyle}> 저장</span>할 수
                있어요!
              </p>

              <video
                src="/video/recommendPickMove.mp4"
                autoPlay
                muted
                playsInline
                loop
                className={videoStyle}
              />
            </Tabs.Content>

            <Tabs.Content
              value={tutorialStepList[2]}
              className={tabContentStyle}
            >
              <p className={tabContentDescriptionStyle}>
                <span className={pointTextStyle}>저장한 북마크</span>를{' '}
                <span className={mobileLinBreakStyle} />
                쉽게
                <span className={pointTextStyle}> 이동</span>할 수 있어요!
              </p>

              <video
                src="/video/multiSelectPickMove.mp4"
                autoPlay
                muted
                playsInline
                loop
                className={videoStyle}
              />
            </Tabs.Content>

            <Tabs.List className={tabListStyle}>
              {tutorialStep === 'tutorial-step-1' && (
                <Tabs.Trigger
                  className={solidButtonStyle}
                  value={tutorialStepList[1]}
                  asChild
                >
                  <button type="button">다음</button>
                </Tabs.Trigger>
              )}

              {tutorialStep === 'tutorial-step-2' && (
                <div className={tabTriggerLayoutStyle}>
                  <Tabs.Trigger
                    className={outlineButtonStyle}
                    value={tutorialStepList[0]}
                    ref={prevButtonRef}
                    onMouseEnter={() => handleMouseEnter(prevButtonRef)}
                    asChild
                  >
                    <button type="button">이전</button>
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    className={solidButtonStyle}
                    value={tutorialStepList[2]}
                    asChild
                  >
                    <button type="button">다음</button>
                  </Tabs.Trigger>
                </div>
              )}

              {tutorialStep === 'tutorial-step-3' && (
                <div className={tabTriggerLayoutStyle}>
                  <Tabs.Trigger
                    className={outlineButtonStyle}
                    value={tutorialStepList[1]}
                    ref={prevButtonRef}
                    onMouseEnter={() => handleMouseEnter(prevButtonRef)}
                    asChild
                  >
                    <button type="button">이전</button>
                  </Tabs.Trigger>

                  {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button
                    onClick={onCloseTutorial}
                    ref={closeButtonRef}
                    onMouseEnter={() => handleMouseEnter(closeButtonRef)}
                    className={solidButtonStyle}
                  >
                    종료
                  </button>
                </div>
              )}
            </Tabs.List>
          </Tabs.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface TutorialDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
