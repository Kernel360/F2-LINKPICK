import { useEffect, useRef, useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import DOMPurify from 'dompurify';
import { createPick } from '@/apis/pick/createPick';
import { ThumbnailImage } from '@/components/CreatePickForm/ThumbnailImage';
import { useTagStore } from '@/stores';
import { notifySuccess } from '@/utils';
import {
  pickFormLayout,
  formFieldLayout,
  titleInputStyle,
  submitButtonStyle,
  plusIconStyle,
  pickFormFieldListLayout,
} from './CreatePickForm.css';
import { FolderSelect } from './FolderSelect';
import { TagPicker } from './TagPicker';
import { FolderType, TagType } from '@/types';

/**
 * @description
 *   익스텐션의 CreatePickForm과 동일한 코드입니다.
 *   TODO: 익스텐션과 동일한 컴포넌트는 따로 빼는 작업 하기
 */
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

  const [selectedFolderId, setSelectedFolderId] = useState(
    `${folderInfoList[0].id}`
  );

  const onSubmit = () => {
    const userModifiedTitle = titleInputRef.current?.value ?? '';

    createPick({
      title: DOMPurify.sanitize(userModifiedTitle),
      tagIdOrderedList: selectedTagList.map((tag: TagType) => tag.id),
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
