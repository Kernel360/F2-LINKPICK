'use client';

import { RefObject, useRef, useState } from 'react';
import {
  useFloating,
  shift,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
} from '@floating-ui/react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import DOMPurify from 'dompurify';
import { useTagStore } from '@/stores';
import { notifyError, isEmptyString, isShallowEqualValue } from '@/utils';
import { PopoverTriggerButton } from './PopoverTriggerButton';
import { ShowDeleteTagDialogButton } from './ShowDeleteTagDialogButton';
import {
  floatingOverlayRefStyle,
  floatingOverlayStyle,
  tagInfoEditFormLayout,
  tagInputStyle,
} from './TagInfoEditPopoverButton.css';
import type { TagType } from '@/types';

export function TagInfoEditPopoverButton({
  tag,
  floatingPortalRootRef,
}: TagInfoEditPopoverButtonProps) {
  const tagNameInputRef = useRef<HTMLInputElement | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const updateTag = useTagStore((state) => state.updateTag);

  const { refs, floatingStyles, context } = useFloating({
    open: isPopoverOpen,
    strategy: 'absolute',
    middleware: [shift({ padding: 4 })],
  });

  const { refs: overlayRef, floatingStyles: overlayFloatingStyles } =
    useFloating({
      strategy: 'fixed',
      placement: 'bottom-start',

      middleware: [
        shift({
          crossAxis: true,
          mainAxis: true,
        }),
      ],
    });

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' && tagNameInputRef.current) {
      tagNameInputRef.current.value += ' ';
      e.preventDefault();
    }

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
      await updateTag({
        id: tag.id,
        name: newTagName,
        colorNumber: tag.colorNumber,
      });
      closePopover();
    } catch (error) {
      if (error instanceof Error) {
        notifyError(error.message);
      }
    }
  };

  return (
    <>
      <PopoverTriggerButton
        ref={refs.setReference}
        onClick={(e) => {
          e.stopPropagation(); // 옵션 버튼을 눌렀을 때, 해당 태그를 선택하는 onSelect를 막기 위헤서 전파 방지
          setIsPopoverOpen(true);
        }}
      />
      {isPopoverOpen && (
        <>
          <div
            ref={overlayRef.setReference}
            className={floatingOverlayRefStyle}
          />
          <FloatingOverlay
            ref={overlayRef.setFloating}
            style={overlayFloatingStyles}
            className={floatingOverlayStyle}
            onClick={(e) => {
              closePopover();
              e.stopPropagation();
            }}
          />
          <FloatingPortal root={floatingPortalRootRef} preserveTabOrder={false}>
            <FloatingFocusManager context={context}>
              <form
                onSubmit={handleSubmit}
                className={tagInfoEditFormLayout}
                ref={refs.setFloating}
                style={floatingStyles}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
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
            </FloatingFocusManager>
          </FloatingPortal>
        </>
      )}
    </>
  );
}

interface TagInfoEditPopoverButtonProps {
  tag: TagType;
  floatingPortalRootRef: RefObject<HTMLDivElement>;
}
