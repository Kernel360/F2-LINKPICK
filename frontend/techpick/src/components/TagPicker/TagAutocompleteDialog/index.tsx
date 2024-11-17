'use client';

import { Dispatch, useEffect, useRef, useState } from 'react';
import { Command } from 'cmdk';
import { BarLoader } from 'react-spinners';
import { colorVars } from 'techpick-shared';
import { useUpdatePickMutation, useGetPickQuery } from '@/apis/pick';
import {
  SelectedTagItem,
  SelectedTagListLayout,
  DeleteTagDialog,
  DeselectTagButton,
} from '@/components';
import { useTagStore } from '@/stores/tagStore';
import { useThemeStore } from '@/stores/themeStore';
import { notifyError, numberToRandomColor } from '@/utils';
import { TagInfoEditPopoverButton } from '../TagInfoEditPopoverButton';
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
import { useCalculateCommandListHeight } from './useCalculateCommandListHeight';
import type { TagType } from '@/types';

export function TagAutocompleteDialog({
  open,
  onOpenChange,
  container,
  pickId,
  selectedTagList,
  setSelectedTagList,
}: TagSelectionDialogProps) {
  const [tagInputValue, setTagInputValue] = useState('');
  const [canCreateTag, setCanCreateTag] = useState(false);
  const tagInputRef = useRef<HTMLInputElement | null>(null);
  const selectedTagListRef = useRef<HTMLDivElement | null>(null);
  const randomNumber = useRef<number>(getRandomInt());
  const { tagList, fetchingTagState, fetchingTagList, createTag } =
    useTagStore();
  const { commandListHeight } =
    useCalculateCommandListHeight(selectedTagListRef);
  const { isDarkMode } = useThemeStore();
  const { data: pickData } = useGetPickQuery(pickId);
  const { mutate: updatePickInfo } = useUpdatePickMutation(pickId);

  const focusTagInput = () => {
    tagInputRef.current?.focus();
  };

  const clearTagInputValue = () => {
    setTagInputValue('');
  };

  const selectTag = (tag: TagType) => {
    const index = selectedTagList.findIndex(
      (selectedTag) => selectedTag.id === tag.id
    );

    if (index !== -1) {
      return;
    }

    setSelectedTagList([...selectedTagList, tag]);
  };

  const deselectTag = (tag: TagType) => {
    const filteredSelectedTagList = selectedTagList.filter(
      (selectedTag) => selectedTag.id !== tag.id
    );

    setSelectedTagList([...filteredSelectedTagList]);
  };

  const onSelectTag = (tag: TagType) => {
    selectTag(tag);
    focusTagInput();
    clearTagInputValue();
  };

  const onSelectCreatableTag = async () => {
    try {
      const newTag = await createTag({
        name: tagInputValue,
        colorNumber: randomNumber.current,
      });
      randomNumber.current = getRandomInt();
      onSelectTag(newTag!);

      if (!pickData || !newTag) {
        return;
      }

      const { title, id } = pickData;

      const previousTagIdList = selectedTagList.map(
        (selectedTag) => selectedTag.id
      );

      updatePickInfo({
        title,

        id,
        tagIdOrderedList: [...previousTagIdList, newTag.id],
      });
    } catch (error) {
      if (error instanceof Error) {
        notifyError(error.message);
      }
    }
  };

  useEffect(
    function fetchTagList() {
      fetchingTagList();
    },
    [fetchingTagList]
  );

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
      onClick={(e) => {
        console.log('Command.Dialog click');
        e.stopPropagation();
        e.preventDefault();
      }}
      onOpenChange={async (open) => {
        onOpenChange(open);

        if (!open && pickData) {
          const { title, id } = pickData;

          updatePickInfo({
            title,

            id,
            tagIdOrderedList: selectedTagList.map(
              (selectedTag) => selectedTag.id
            ),
          });
        }

        // updatePickInfo()
        // 비동기 api 요청을 보내자!
      }}
      container={container?.current ?? undefined}
      className={tagDialogPortalLayout}
      filter={filterCommandItems}
    >
      {/**선택한 태그 리스트 */}
      <SelectedTagListLayout ref={selectedTagListRef} focusStyle="focus">
        {selectedTagList.map((tag) => (
          <SelectedTagItem key={tag.id} tag={tag}>
            <DeselectTagButton
              onClick={() => {
                focusTagInput();
                deselectTag(tag);
              }}
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
      <Command.List
        className={tagListStyle}
        style={{ maxHeight: commandListHeight }}
      >
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
            <TagInfoEditPopoverButton
              tag={tag}
              selectedTagList={selectedTagList}
              setSelectedTagList={setSelectedTagList}
            />
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
  pickId: number;
  selectedTagList: TagType[];
  setSelectedTagList: Dispatch<React.SetStateAction<TagType[]>>;
}
