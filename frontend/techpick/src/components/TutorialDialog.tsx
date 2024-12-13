'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { IS_TUTORIAL_SEEN_LOCAL_STORAGE_KEY } from '@/constants';
import { useDisclosure, useLocalStorage } from '@/hooks';
import { Gap } from './Gap';
import {
  dialogCloseButtonStyle,
  dialogContent,
  overlayStyle,
  pointTextStyle,
  tabContentDescriptionStyle,
  tabContentStyle,
  tabListStyle,
  tabTriggerButtonStyle,
  tabTriggerLayoutStyle,
} from './tutorialDialog.css';

const tutorialStepList = ['tutorial-step-1', 'tutorial-step-2'] as const;
type TutorialStepType = (typeof tutorialStepList)[number];

export function TutorialDialog() {
  const [tutorialStep, setTutorialStep] = useState<TutorialStepType>(
    tutorialStepList[0]
  );
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    storedValue: isTutorialSeen,
    setValue: setIsTutorialSeen,
    isStoredValueLoad,
  } = useLocalStorage(IS_TUTORIAL_SEEN_LOCAL_STORAGE_KEY, false);

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

  useEffect(
    function openTutorialForFirstTimeUser() {
      if (isStoredValueLoad && !isTutorialSeen) {
        onOpen();
      }
    },
    [isStoredValueLoad, isTutorialSeen, onOpen]
  );

  return (
    <Dialog.Root open={isOpen} modal>
      <Dialog.Portal>
        <Dialog.Overlay className={overlayStyle} />
        <Dialog.Content className={dialogContent}>
          <VisuallyHidden.Root>
            <Dialog.Title>튜토리얼</Dialog.Title>
            <Dialog.Description>튜토리얼 설명입니다.</Dialog.Description>
          </VisuallyHidden.Root>

          <Tabs.Root
            value={tutorialStep}
            onValueChange={onValueChange}
            activationMode={'manual'}
            className={tabContentStyle}
          >
            <Tabs.Content value={tutorialStepList[0]}>
              <p className={tabContentDescriptionStyle}>
                📌 <span className={pointTextStyle}>추천 페이지</span>에서
                원하는 걸<span className={pointTextStyle}> 저장</span>할 수
                있어요!
              </p>

              <Gap verticalSize="gap16" />

              <Image
                src={'/video/recommendPickMove.gif'}
                alt="GIF 설명"
                unoptimized
                width={659}
                height={389}
                priority={true}
              />
            </Tabs.Content>

            <Tabs.Content value={tutorialStepList[1]}>
              <p className={tabContentDescriptionStyle}>
                <span className={pointTextStyle}>저장한 북마크</span>를 쉽게
                <span className={pointTextStyle}> 이동</span>할 수 있어요!
              </p>

              <Gap verticalSize="gap16" />

              <Image
                src={'/video/multiSelectPickMove.gif'}
                alt="GIF 설명"
                unoptimized
                width={659}
                height={389}
              />
            </Tabs.Content>

            <Tabs.List className={tabListStyle}>
              {tutorialStep === tutorialStepList[0] ? (
                <Tabs.Trigger
                  className={tabTriggerButtonStyle}
                  value={tutorialStepList[1]}
                  asChild
                >
                  <button>다음</button>
                </Tabs.Trigger>
              ) : (
                <div className={tabTriggerLayoutStyle}>
                  <Tabs.Trigger
                    className={tabTriggerButtonStyle}
                    value={tutorialStepList[0]}
                    ref={prevButtonRef}
                    onMouseEnter={() => handleMouseEnter(prevButtonRef)}
                    asChild
                  >
                    <button>이전</button>
                  </Tabs.Trigger>
                  <button
                    onClick={onCloseTutorial}
                    ref={closeButtonRef}
                    onMouseEnter={() => handleMouseEnter(closeButtonRef)}
                    className={dialogCloseButtonStyle}
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
