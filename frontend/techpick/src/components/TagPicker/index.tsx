'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { useGetPickQuery } from '@/apis/pick';
import { SelectedTagItem, SelectedTagListLayout } from '@/components';
import { useTagStore } from '@/stores/tagStore';
import { TagAutocompleteDialog } from './TagAutocompleteDialog';
import { tagPickerLayout, tagDialogTriggerLayout } from './TagPicker.css';
import type { TagType } from '@/types';

export const TagPicker = forwardRef<HTMLDivElement, TagPickerProps>(
  function TagPickerWithRef({ pickId }, tabFocusRef) {
    const [open, setOpen] = useState(false);
    const [selectedTagList, setSelectedTagList] = useState<TagType[]>([]);
    const tagInputContainerRef = useRef<HTMLDivElement>(null);
    const { data: pickData } = useGetPickQuery(pickId);
    const { tagList } = useTagStore();

    useEffect(
      function tagPickerLoad() {
        if (!pickData) {
          return;
        }

        const selectedTagList = tagList.filter((tag) =>
          pickData.tagIdOrderedList.includes(tag.id)
        );

        setSelectedTagList(selectedTagList);
      },
      [pickData, tagList]
    );

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
          onClick={(e) => {
            console.log('tagDialogTriggerLayout click');
            e.preventDefault();
            openDialog();
          }}
          onKeyDown={onEnterKeyDown}
          tabIndex={0}
          ref={tabFocusRef}
        >
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
          pickId={pickId}
          selectedTagList={selectedTagList}
          setSelectedTagList={setSelectedTagList}
        />
      </div>
    );
  }
);

interface TagPickerProps {
  pickId: number;
}
