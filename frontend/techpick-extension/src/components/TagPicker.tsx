import { forwardRef, useRef, useState } from 'react';
import { useTagStore } from '@/stores';
import { SelectedTagItem } from './SelectedTagItem';
import { SelectedTagListLayout } from './SelectedTagListLayout';
import { TagAutocompleteDialog } from './TagAutocompleteDialog';
import {
  tagPickerLayout,
  tagDialogTriggerLayout,
  tagPickerPlaceholderStyle,
} from './TagPicker.css';

export const TagPicker = forwardRef<HTMLDivElement>(
  function TagPickerWithRef(_props, tabFocusRef) {
    const [open, setOpen] = useState(false);
    const tagInputContainerRef = useRef<HTMLDivElement>(null);
    const { selectedTagList } = useTagStore();

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
          <SelectedTagListLayout height="fixed">
            {selectedTagList.map((tag) => (
              <SelectedTagItem key={tag.name} tag={tag} />
            ))}
          </SelectedTagListLayout>
        </div>

        <TagAutocompleteDialog
          open={open}
          onOpenChange={setOpen}
          container={tagInputContainerRef}
        />
      </div>
    );
  }
);
