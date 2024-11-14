'use client';

import { Dispatch, useRef, useState } from 'react';
import { useFloating, shift } from '@floating-ui/react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useQueryClient } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { ShowDeleteTagDialogButton } from '@/components';
import { useTagStore } from '@/stores/tagStore';
import { notifyError } from '@/utils';
import { PopoverOverlay } from './PopoverOverlay';
import { PopoverTriggerButton } from './PopoverTriggerButton';
import {
  tagInfoEditFormLayout,
  tagInputStyle,
} from './TagInfoEditPopoverButton.css';
import { isEmptyString, isSameValue } from './TagInfoEditPopoverButton.lib';
import { TagType } from '@/types';

export function TagInfoEditPopoverButton({
  tag,
  selectedTagList,
  setSelectedTagList,
}: TagInfoEditPopoverButtonProps) {
  const tagNameInputRef = useRef<HTMLInputElement | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const updateTag = useTagStore((state) => state.updateTag);
  const queryClient = useQueryClient();

  const { refs, floatingStyles } = useFloating({
    open: isPopoverOpen,
    middleware: [shift({ padding: 4 })],
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

    if (isEmptyString(newTagName) || isSameValue(newTagName, tag.name)) {
      closePopover();
      return;
    }

    const index = selectedTagList.findIndex(
      (selectedTag) => selectedTag.id === tag.id
    );

    if (index !== -1) {
      const tempSelectedTagList = [...selectedTagList];
      tempSelectedTagList[index] = {
        id: tag.id,
        name: newTagName,
        colorNumber: tag.colorNumber,
      };
      setSelectedTagList(tempSelectedTagList);
    }

    try {
      await updateTag({
        id: tag.id,
        name: newTagName,
        colorNumber: tag.colorNumber,
      });
      queryClient.invalidateQueries({
        queryKey: ['pick'],
      });
      closePopover();
    } catch (error) {
      if (error instanceof Error) {
        notifyError(error.message);
      }
    }
  };

  return (
    <div>
      <PopoverTriggerButton
        ref={refs.setReference}
        onClick={(e) => {
          e.stopPropagation(); // 옵션 버튼을 눌렀을 때, 해당 태그를 선택하는 onSelect를 막기 위헤서 전파 방지
          e.preventDefault();
          setIsPopoverOpen(true);
        }}
      />
      {isPopoverOpen && (
        <>
          <PopoverOverlay
            onClick={(e) => {
              closePopover();
              e.stopPropagation();
              e.preventDefault();
            }}
          />
          <form
            onSubmit={handleSubmit}
            className={tagInfoEditFormLayout}
            ref={refs.setFloating}
            style={floatingStyles}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
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
        </>
      )}
    </div>
  );
}

interface TagInfoEditPopoverButtonProps {
  tag: TagType;
  selectedTagList: TagType[];
  setSelectedTagList: Dispatch<React.SetStateAction<TagType[]>>;
}
