'use client';

import { useRef } from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import DOMPurify from 'dompurify';
import { EllipsisIcon } from 'lucide-react';
import { useDisclosure } from '@/hooks';
import { useTagStore } from '@/stores';
import { notifyError, isEmptyString, isShallowEqualValue } from '@/utils';
import { ShowDeleteTagDialogButton } from './ShowDeleteTagDialogButton';
import {
  tagInfoEditFormLayout,
  tagInputStyle,
  popoverTriggerButtonStyle,
} from './TagInfoEditPopoverButton.css';
import type { TagType } from '@/types';

export function TagInfoEditPopoverButton({
  tag,
  container,
}: TagInfoEditPopoverButtonProps) {
  const tagNameInputRef = useRef<HTMLInputElement | null>(null);
  const updateTag = useTagStore((state) => state.updateTag);
  const {
    isOpen: isPopoverOpen,
    onClose: closePopover,
    onOpen: openPopover,
    setIsOpen,
  } = useDisclosure();

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (!tagNameInputRef.current) {
      return;
    }

    const newTagName = DOMPurify.sanitize(tagNameInputRef.current.value.trim());

    if (
      isEmptyString(newTagName) ||
      isShallowEqualValue(newTagName, tag.name)
    ) {
      closePopover();
      return;
    }

    try {
      closePopover();
      await updateTag({
        id: tag.id,
        name: newTagName,
        colorNumber: tag.colorNumber,
      });
    } catch (error) {
      if (error instanceof Error) {
        notifyError(error.message);
      }
    }
  };

  return (
    <Popover.Root open={isPopoverOpen} onOpenChange={setIsOpen} modal>
      <Popover.Trigger
        className={popoverTriggerButtonStyle}
        role="button"
        onClick={(e) => {
          e.stopPropagation(); // 옵션 버튼을 눌렀을 때, 해당 태그를 선택하는 onSelect를 막기 위헤서 전파 방지
          openPopover();
        }}
      >
        <EllipsisIcon size={14} />
      </Popover.Trigger>

      <Popover.Portal container={container}>
        <Popover.Content style={{ zIndex: 3 }}>
          <form
            onSubmit={handleSubmit}
            className={tagInfoEditFormLayout}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key !== 'Tab') {
                e.stopPropagation();
              }
            }}
          >
            <input
              type="text"
              defaultValue={tag.name}
              ref={tagNameInputRef}
              autoFocus
              onKeyDown={handleInputKeyDown}
              className={tagInputStyle}
            />
            <ShowDeleteTagDialogButton tag={tag} onClick={closePopover} />
            <VisuallyHidden.Root>
              <button type="submit" aria-label="제출">
                제출
              </button>
            </VisuallyHidden.Root>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

interface TagInfoEditPopoverButtonProps {
  tag: TagType;
  container: HTMLDivElement | null;
}
