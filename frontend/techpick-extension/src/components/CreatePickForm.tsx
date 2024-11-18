import DOMPurify from 'dompurify';
import { Button, Text } from '@/libs/@components';
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
  submitButtonLayout,
  labelLayout,
} from './CreatePickForm.css';
import { useRef, useState } from 'react';
import { FolderType } from '@/types';
import { FolderSelect } from './FolderSelect';

export function CreatePickForm({
  title,
  url,
  imageUrl,
  description,
  folderInfoList,
}: CreatePickFormProps) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const tagPickerRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { selectedTagList } = useTagStore();
  useChangeFocusUsingArrowKey([titleInputRef, tagPickerRef, submitButtonRef]);
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
            <label htmlFor="">폴더</label>
          </Text>
        </div>
        <FolderSelect
          folderInfoList={folderInfoList}
          selectedFolderId={selectedFolderId}
          setSelectedFolderId={setSelectedFolderId}
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
  folderInfoList: FolderType[];
}
