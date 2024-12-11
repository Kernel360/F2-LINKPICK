'use client';

import { forwardRef, useState } from 'react';
import { autoUpdate, shift, useFloating } from '@floating-ui/react';
import { useUpdatePickStore } from '@/stores';
import { SelectedTagItem } from '../SelectedTagItem';
import { PickTagAutocompleteDialog } from './PickTagAutocompleteDialog';
import {
  tagPickerLayout,
  tagDialogTriggerLayout,
  tagPickerPlaceholderStyle,
} from './pickTagPicker.css';
import { SelectedTagListLayout } from '../SelectedTagListLayout/SelectedTagListLayout';
import { PickInfoType, TagType } from '@/types';

export const PickTagPicker = forwardRef<HTMLDivElement, PickTagPickerProps>(
  function PickTagPickerWithRef({ pickInfo, selectedTagList }, tabFocusRef) {
    const [open, setOpen] = useState(false);
    const { setCurrentUpdateTagPickId } = useUpdatePickStore();
    const { refs, floatingStyles } = useFloating({
      strategy: 'fixed',
      placement: 'bottom-start',

      whileElementsMounted: autoUpdate,
      middleware: [
        shift({
          crossAxis: true,
          padding: 10,
        }),
      ],
    });

    const openDialog = () => {
      setOpen(true);
      setCurrentUpdateTagPickId(pickInfo.id);
    };

    const onEnterKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'Enter') {
        return;
      }

      openDialog();
    };

    return (
      <div>
        <div ref={refs.setReference} />
        <div className={tagPickerLayout}>
          <div
            className={tagDialogTriggerLayout}
            onDoubleClick={openDialog}
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

          <PickTagAutocompleteDialog
            open={open}
            onOpenChange={setOpen}
            pickInfo={pickInfo}
            selectedTagList={selectedTagList}
            setFloating={refs.setFloating}
            floatingStyles={floatingStyles}
          />
        </div>
      </div>
    );
  }
);

interface PickTagPickerProps {
  pickInfo: PickInfoType;
  selectedTagList: TagType[];
}
