'use client';

import { useEffect, useRef, useState } from 'react';
import { Command } from 'cmdk';
import { BarLoader } from 'react-spinners';
import { colorVars } from 'techpick-shared';
import { useThemeStore, useTagStore, usePickStore } from '@/stores';
import { notifyError, numberToRandomColor } from '@/utils';
import { DeleteTagDialog } from './DeleteTagDialog';
import { DeselectTagButton } from './DeselectTagButton';
import { SelectedTagItem } from '../SelectedTagItem';
import {
  tagDialogPortalLayout,
  commandInputStyle,
  tagListItemStyle,
  tagListItemContentStyle,
  tagCreateTextStyle,
  tagListStyle,
  tagListLoadingStyle,
} from './TagAutocompleteDialog.css';
import {
  filterCommandItems,
  CREATABLE_TAG_KEYWORD,
  getRandomInt,
} from './TagAutocompleteDialog.lib';
import { TagInfoEditPopoverButton } from './TagInfoEditPopoverButton';
import { SelectedTagListLayout } from '../SelectedTagListLayout/SelectedTagListLayout';
import { PickInfoType, TagType } from '@/types';

export function TagAutocompleteDialog({
  open,
  onOpenChange,
  container,
  pickInfo,
  selectedTagList,
}: TagSelectionDialogProps) {
  const [tagInputValue, setTagInputValue] = useState('');
  const [canCreateTag, setCanCreateTag] = useState(false);
  const tagInputRef = useRef<HTMLInputElement | null>(null);
  const selectedTagListRef = useRef<HTMLDivElement | null>(null);
  const isCreateFetchPendingRef = useRef<boolean>(false);
  const randomNumber = useRef<number>(getRandomInt());
  const tagIdOrderedList = selectedTagList.map((tag) => tag.id);

  const { tagList, fetchingTagState, createTag } = useTagStore();
  const { updatePickInfo } = usePickStore();
  const { isDarkMode } = useThemeStore();

  const focusTagInput = () => {
    tagInputRef.current?.focus();
    tagInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const clearTagInputValue = () => {
    setTagInputValue('');
  };

  const onSelectTag = (tag: TagType) => {
    if (tagIdOrderedList.includes(tag.id)) {
      return;
    }

    const newTagIdOrderedList = [...tagIdOrderedList, tag.id];

    focusTagInput();
    clearTagInputValue();
    updatePickInfo(pickInfo.parentFolderId, {
      id: pickInfo.id,
      tagIdOrderedList: newTagIdOrderedList,
    });
  };

  const onSelectCreatableTag = async () => {
    if (isCreateFetchPendingRef.current) {
      return;
    }

    try {
      isCreateFetchPendingRef.current = true;

      const newTag = await createTag({
        name: tagInputValue,
        colorNumber: randomNumber.current,
      });
      randomNumber.current = getRandomInt();
      onSelectTag(newTag!);
    } catch (error) {
      if (error instanceof Error) {
        notifyError(error.message);
      }
    } finally {
      isCreateFetchPendingRef.current = false;
    }
  };

  useEffect(
    function checkIsCreatableTag() {
      const isUnique = !tagList.some((tag) => tag.name === tagInputValue);
      const isNotInitialValue = tagInputValue.trim() !== '';
      const isCreatable = isUnique && isNotInitialValue;

      setCanCreateTag(isCreatable);
    },
    [tagInputValue, tagList]
  );

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      container={container?.current ?? undefined}
      className={tagDialogPortalLayout}
      filter={filterCommandItems}
    >
      {/**선택한 태그 리스트 */}
      <SelectedTagListLayout ref={selectedTagListRef} focusStyle="focus">
        {selectedTagList.map((tag) => (
          <SelectedTagItem key={tag.id} tag={tag}>
            <DeselectTagButton
              tag={tag}
              onClick={focusTagInput}
              pickInfo={pickInfo}
              selectedTagList={selectedTagList}
            />
          </SelectedTagItem>
        ))}

        <Command.Input
          className={commandInputStyle}
          ref={tagInputRef}
          value={tagInputValue}
          onValueChange={setTagInputValue}
        />
      </SelectedTagListLayout>

      {/**전체 태그 리스트 */}
      <Command.List className={tagListStyle}>
        {fetchingTagState.isPending && (
          <Command.Loading className={tagListLoadingStyle}>
            <BarLoader color={colorVars.color.font} />
          </Command.Loading>
        )}

        {(!fetchingTagState.isPending || tagInputValue.trim()) !== '' && (
          <Command.Empty className={tagListItemStyle}>
            태그를 만들어보세요!
          </Command.Empty>
        )}

        {tagList.map((tag) => (
          <Command.Item
            key={tag.id}
            className={tagListItemStyle}
            onSelect={() => onSelectTag(tag)}
            keywords={[tag.name]}
          >
            <SelectedTagItem key={tag.id} tag={tag} />
            <TagInfoEditPopoverButton tag={tag} />
          </Command.Item>
        ))}

        {canCreateTag && (
          <Command.Item
            className={tagListItemStyle}
            value={tagInputValue}
            keywords={[CREATABLE_TAG_KEYWORD]}
            onSelect={onSelectCreatableTag}
            disabled={!canCreateTag}
          >
            <span
              className={tagListItemContentStyle}
              style={{
                backgroundColor: numberToRandomColor(
                  randomNumber.current,
                  isDarkMode ? 'dark' : 'light'
                ),
              }}
            >
              {tagInputValue}
            </span>
            <span className={tagCreateTextStyle}>생성</span>
          </Command.Item>
        )}
      </Command.List>

      {/**DeleteTagDialog를 닫고도 Command.Dialog가 켜져있기위해서 Command.Dialog 내부에 있어야합니다.*/}
      <DeleteTagDialog />
    </Command.Dialog>
  );
}

interface TagSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  container?: React.RefObject<HTMLElement>;
  pickInfo: PickInfoType;
  selectedTagList: TagType[];
}
