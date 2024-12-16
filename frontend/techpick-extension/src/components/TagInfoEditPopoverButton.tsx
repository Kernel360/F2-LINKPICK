import { useRef, useState } from 'react';
import { useFloating, shift, FloatingFocusManager } from '@floating-ui/react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import DOMPurify from 'dompurify';
import { notifyError } from '@/libs/@toast';
import type { TagType } from '@/types';
import { useTagStore } from '@/stores';
import { ShowDeleteTagDialogButton } from './ShowDeleteTagDialogButton';
import { PopoverTriggerButton } from './PopoverTriggerButton';
import { isEmptyString, isShallowEqualValue } from '@/utils';
import {
  floatingOverlayStyle,
  tagInfoEditFormLayout,
  tagInputStyle,
} from './TagInfoEditPopoverButton.css';
import { FloatingOverlay } from '@floating-ui/react';

export function TagInfoEditPopoverButton({
  tag,
}: TagInfoEditPopoverButtonProps) {
  const tagNameInputRef = useRef<HTMLInputElement | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const updateTag = useTagStore((state) => state.updateTag);
  const { refs, floatingStyles, context } = useFloating({
    open: isPopoverOpen,
    middleware: [shift({ padding: 4, crossAxis: true })],
    onOpenChange: setIsPopoverOpen,
  });

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
      return;
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
        <FloatingFocusManager context={context} modal={true}>
          <FloatingOverlay
            onClick={(e) => {
              closePopover();
              e.stopPropagation();
            }}
            className={floatingOverlayStyle}
          >
            <form
              onSubmit={handleSubmit}
              className={tagInfoEditFormLayout}
              ref={refs.setFloating}
              style={floatingStyles}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              role="dialog"
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
          </FloatingOverlay>
        </FloatingFocusManager>
      )}
    </>
  );
}

interface TagInfoEditPopoverButtonProps {
  tag: TagType;
}
