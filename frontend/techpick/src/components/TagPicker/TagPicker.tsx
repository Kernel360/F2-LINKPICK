'use client';

import { forwardRef, useRef, useState } from 'react';
import { SelectedTagItem } from '../SelectedTagItem';
import { TagAutocompleteDialog } from './TagAutocompleteDialog';
import {
  tagPickerLayout,
  tagDialogTriggerLayout,
  tagPickerPlaceholderStyle,
} from './TagPicker.css';
import { SelectedTagListLayout } from '../SelectedTagListLayout/SelectedTagListLayout';
import { PickInfoType, TagType } from '@/types';

export const TagPicker = forwardRef<HTMLDivElement, TagPickerProps>(
  function TagPickerWithRef({ pickInfo, selectedTagList }, tabFocusRef) {
    const [open, setOpen] = useState(false);
    const tagInputContainerRef = useRef<HTMLDivElement>(null);

    const openDialog = () => {
      setOpen(true);
    };

    const onEnterKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'Enter') {
        return;
      }

      openDialog();
    };

    return (
      <div ref={tagInputContainerRef} className={tagPickerLayout}>
        <div
          className={tagDialogTriggerLayout}
          onClick={openDialog}
          onKeyDown={onEnterKeyDown}
          tabIndex={0}
          ref={tabFocusRef}
        >
          {selectedTagList.length === 0 && (
            <p className={tagPickerPlaceholderStyle}>태그를 넣어주세요</p>
          )}
          <SelectedTagListLayout>
            {selectedTagList.map((tag) => (
              <SelectedTagItem key={tag.name} tag={tag} />
            ))}
          </SelectedTagListLayout>
        </div>

        <TagAutocompleteDialog
          open={open}
          onOpenChange={setOpen}
          container={tagInputContainerRef}
          pickInfo={pickInfo}
          selectedTagList={selectedTagList}
        />
      </div>
    );
  }
);

interface TagPickerProps {
  pickInfo: PickInfoType;
  selectedTagList: TagType[];
}
