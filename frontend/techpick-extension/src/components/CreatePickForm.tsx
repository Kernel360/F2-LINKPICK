import DOMPurify from 'dompurify';
import { Button, Text } from '@/libs/@components';
import { notifyError, notifySuccess } from '@/libs/@toast';
import { useChangeFocusUsingArrowKey } from '@/hooks';
import { useTagStore } from '@/stores';
import { createPick, getBasicFolderList } from '@/apis';
import { TagPicker } from '@/components';
import { ThumbnailImage } from './ThumbnailImage';
import {
  pickFormLayout,
  formFieldLayout,
  titleInputStyle,
  textAreaStyle,
  submitButtonLayout,
  labelLayout,
} from './CreatePickForm.css';
import { useEffect, useRef, useState } from 'react';
import { GetBasicFolderListType } from '@/types';

export function CreatePickForm({
  title,
  url,
  imageUrl,
  description,
}: CreatePickFormProps) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const tagPickerRef = useRef<HTMLDivElement>(null);
  const memoInputRef = useRef<HTMLTextAreaElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { selectedTagList } = useTagStore();
  const [basicFolderList, setBasicFolderList] =
    useState<GetBasicFolderListType>();

  useChangeFocusUsingArrowKey([
    titleInputRef,
    tagPickerRef,
    memoInputRef,
    submitButtonRef,
  ]);

  useEffect(function onLoadCreatePickForm() {
    getBasicFolderList().then((value) => {
      setBasicFolderList(value);
    });
  }, []);

  const onSubmit = () => {
    const userModifiedTitle = titleInputRef.current?.value ?? '';

    if (!basicFolderList) {
      return;
    }

    const unclassifiedFolderInfo = basicFolderList.find(
      (folder) => folder.folderType === 'UNCLASSIFIED'
    );

    if (!unclassifiedFolderInfo) {
      return;
    }

    /**
     * @description 현재는 미분류폴더로만 이동합니다.
     */
    createPick({
      title: DOMPurify.sanitize(userModifiedTitle),
      tagIdOrderedList: selectedTagList.map((tag) => tag.id),
      linkInfo: {
        title,
        url,
        imageUrl,
        description,
      },
      parentFolderId: unclassifiedFolderInfo.id,
    })
      .then(() => {
        notifySuccess('저장되었습니다!');
      })
      .catch((error: Error) => {
        notifyError(`${error.message}로 인해 북마크가 실패했습니다!`);
      });
  };

  return (
    <form className={pickFormLayout} onSubmit={(e) => e.preventDefault()}>
      <div className={formFieldLayout}>
        <ThumbnailImage image={imageUrl} />
        <input
          type="text"
          defaultValue={title}
          ref={titleInputRef}
          className={titleInputStyle}
        />
      </div>
      <div className={formFieldLayout}>
        <div className={labelLayout}>
          <Text size="2xl" asChild>
            <label htmlFor="">태그</label>
          </Text>
        </div>
        <TagPicker ref={tagPickerRef} />
      </div>
      <div className={formFieldLayout}>
        <div className={labelLayout}>
          <Text size="2xl" asChild>
            <label htmlFor="">메모</label>
          </Text>
        </div>
        <textarea
          id="memo"
          className={textAreaStyle}
          ref={memoInputRef}
        ></textarea>
      </div>
      <div className={submitButtonLayout}>
        <Button onClick={onSubmit} ref={submitButtonRef}>
          제출
        </Button>
      </div>
    </form>
  );
}

interface CreatePickFormProps {
  imageUrl: string;
  title: string;
  url: string;
  description: string;
}
