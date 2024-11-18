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
} from './CreatePickForm.css';
import { useRef, useState } from 'react';
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

  /**
   * @description 현재는 0번째가 기본 선택이지만 추후에는 최신 선택순으로 바뀔 예정이다.
   */
  const unclassifiedFolderInfo = folderInfoList.find(
    (folder) => folder.folderType === 'UNCLASSIFIED'
  );
  const [selectedFolderId, setSelectedFolderId] = useState(
    `${unclassifiedFolderInfo?.id ?? folderInfoList[0].id}`
  );

  const onSubmit = () => {
    const userModifiedTitle = titleInputRef.current?.value ?? '';

    createPick({
      title: DOMPurify.sanitize(userModifiedTitle),
      tagIdOrderedList: selectedTagList.map((tag) => tag.id),
      linkInfo: {
        title,
        url,
        imageUrl,
        description,
      },
      parentFolderId: Number(selectedFolderId),
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
            <p className={footerTextStyle}>app.techpick.org</p>
          </a>
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
