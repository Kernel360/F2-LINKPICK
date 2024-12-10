import DOMPurify from 'dompurify';

import { notifyError, notifySuccess } from '@/libs/@toast';
import { useChangeFocusUsingArrowKey } from '@/hooks';
import { useTagStore } from '@/stores';
import { createPick } from '@/apis';
import { TagPicker } from '@/components';
import { ThumbnailImage } from './ThumbnailImage';
import {
  pickFormLayout,
  formFieldLayout,
  titleInputStyle,
  submitButtonStyle,
  plusIconStyle,
  footerStyle,
  footerTextStyle,
  pickFormFieldListLayout,
  footerLinkStyle,
} from './CreatePickForm.css';
import { useEffect, useRef, useState } from 'react';
import { FolderType } from '@/types';
import { FolderSelect } from './FolderSelect';
import { PlusIcon } from '@radix-ui/react-icons';
import { PUBLIC_DOMAIN } from '@/constants';

export function CreatePickForm({
  title,
  url,
  imageUrl,
  description,
  folderInfoList,
}: CreatePickFormProps) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const tagPickerRef = useRef<HTMLDivElement>(null);
  const folderSelectRef = useRef<HTMLButtonElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { selectedTagList } = useTagStore();
  useChangeFocusUsingArrowKey([
    titleInputRef,
    tagPickerRef,
    folderSelectRef,
    submitButtonRef,
  ]);

  const [selectedFolderId, setSelectedFolderId] = useState(
    `${folderInfoList[0].id}`
  );

  const onSubmit = () => {
    const userModifiedTitle = titleInputRef.current?.value ?? '';

    if (!url.startsWith('http')) {
      notifyError('해당 url을 저장할 수 없습니다.');
      return;
    }

    if (userModifiedTitle.trim() === '') {
      notifyError('제목이 비어있는 상태로 저장할 수 없습니다.');
      return;
    }

    createPick({
      title: DOMPurify.sanitize(userModifiedTitle.trim()),
      tagIdOrderedList: selectedTagList.map((tag) => tag.id),
      linkInfo: {
        title,
        url,
        imageUrl,
        description,
      },
      parentFolderId: Number(selectedFolderId),
    }).then(() => {
      notifySuccess('저장되었습니다!');
      setTimeout(() => {
        window.close();
      }, 900);
    });
  };

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  return (
    <form className={pickFormLayout} onSubmit={(e) => e.preventDefault()}>
      <div className={pickFormFieldListLayout}>
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
          <TagPicker ref={tagPickerRef} />
        </div>
        <div className={formFieldLayout}>
          <FolderSelect
            folderInfoList={folderInfoList}
            selectedFolderId={selectedFolderId}
            setSelectedFolderId={setSelectedFolderId}
            ref={folderSelectRef}
          />
        </div>
        <div className={footerStyle}>
          <a href={PUBLIC_DOMAIN} target="_blank">
            <p className={footerLinkStyle}>app.techpick.org</p>
          </a>
          <p className={footerTextStyle}>새로 만들기</p>
        </div>
      </div>

      <button
        className={submitButtonStyle}
        onClick={onSubmit}
        ref={submitButtonRef}
      >
        <div className={plusIconStyle}>
          <PlusIcon width={40} height={40} />
        </div>
      </button>
    </form>
  );
}

interface CreatePickFormProps {
  imageUrl: string;
  title: string;
  url: string;
  description: string;
  folderInfoList: FolderType[];
}
