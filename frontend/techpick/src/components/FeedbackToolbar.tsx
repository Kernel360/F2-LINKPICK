import Image from 'next/image';
import * as Tooltip from '@radix-ui/react-tooltip';
import { FileQuestionIcon, CircleAlertIcon } from 'lucide-react';
import {
  qnaSection,
  tooltipArrow,
  tooltipContent,
  tooltipTriggerStyle,
} from './feedbackToolbar.css';

export function FeedbackToolbar() {
  return (
    <Tooltip.Provider>
      <div className={qnaSection}>
        <Tooltip.Root>
          <Tooltip.Trigger>
            <div className={tooltipTriggerStyle}>
              <a
                href="https://docs.google.com/forms/d/17xikG5dL7J9--TN7jR1b17OYHT-hOMyA9o95BOLCMGU/edit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CircleAlertIcon size={24} />
              </a>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className={tooltipContent}
              sideOffset={5}
              side="left"
            >
              불편사항 접수
              <Tooltip.Arrow className={tooltipArrow} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger>
            <div className={tooltipTriggerStyle}>
              <a
                href="https://docs.google.com/forms/d/1mRkjnR66BmFgEj8GZIAwsTXHAa8gK2Fq3TkTqSWJ2yY/viewform?edit_requested=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileQuestionIcon size={24} />
              </a>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className={tooltipContent}
              sideOffset={5}
              side="left"
            >
              기능 추가 문의
              <Tooltip.Arrow className={tooltipArrow} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger>
            <div className={tooltipTriggerStyle}>
              <a
                href="https://chromewebstore.google.com/detail/techpick-extension/gfkkgllophliamkdclhekgfiohnbdddl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={'/image/chrome_icon.png'}
                  width={24}
                  height={24}
                  alt="chrome icon image"
                />
              </a>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className={tooltipContent}
              sideOffset={5}
              side="left"
            >
              크롬 익스텐션
              <Tooltip.Arrow className={tooltipArrow} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </Tooltip.Provider>
  );
}
