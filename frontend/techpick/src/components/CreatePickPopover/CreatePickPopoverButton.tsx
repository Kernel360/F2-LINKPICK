'use client';

import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { PlusIcon } from 'lucide-react';
import { getOgDataByUrl } from '@/apis/getLinkOgDataByUrl';
import { getPickByUrl } from '@/apis/pick';
import { usePickStore, useTreeStore } from '@/stores';
import { notifyError, notifySuccess } from '@/utils';
import {
  popoverContentStyle,
  urlInputStyle,
  createPickButtonStyle,
  inputLabelStyle,
  popoverTriggerStyle,
  wrongDescriptionTextStyle,
} from './createPickPopoverButton.css';

export function CreatePickPopoverButton() {
  const focusFolderId = useTreeStore((state) => state.focusFolderId);
  const createPick = usePickStore((state) => state.createPick);
  const [urlInputValue, setUrlInputValue] = useState('');

  const handleSubmit = async () => {
    const urlValue = urlInputValue.trim();

    if (!urlValue || urlValue === '') {
      return;
    }

    const pick = await getPickByUrl(urlValue);
    if (pick.exist) {
      notifyError('이미 북마크가 존재합니다.');
      return;
    }

    try {
      const ogData = await getOgDataByUrl(urlValue);
      if (focusFolderId) {
        await createPick({
          title: ogData.title,
          parentFolderId: focusFolderId,
          tagIdOrderedList: [],
          linkInfo: ogData,
        });
        notifySuccess('성공했습니다!');
      }
    } catch {
      /* empty */
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger className={popoverTriggerStyle}>
        <PlusIcon size={12} />
        <span>북마크 추가하기</span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="end" className={popoverContentStyle}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <label className={inputLabelStyle} htmlFor="create-pick-input">
              URL
            </label>
            <input
              id="create-pick-input"
              className={urlInputStyle}
              value={urlInputValue}
              onChange={(e) => {
                setUrlInputValue(e.target.value);
              }}
            />
            <div>
              {urlInputValue !== '' && !urlInputValue.startsWith('http') && (
                <p className={wrongDescriptionTextStyle}>
                  잘못된 url 형식입니다.
                </p>
              )}
            </div>

            <button className={createPickButtonStyle}>생성</button>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
