import DOMPurify from 'dompurify';
import { notifyError, notifySuccess } from '@/libs/@toast';
import { useChangeFocusUsingArrowKey } from '@/hooks';
import { useTagStore } from '@/stores';
import { FolderType } from '@/types';
import { updatePick } from '@/apis';
import { TagPicker } from '@/components';
import { ThumbnailImage } from './ThumbnailImage';
import {
  pickFormLayout,
  formFieldLayout,
  titleInputStyle,
  pickFormFieldListLayout,
  submitButtonStyle,
  plusIconStyle,
  footerStyle,
  footerTextStyle,
  footerLinkStyle,
  footerLinkTextStyle,
} from './CreatePickForm.css';
import { useEffect, useRef, useState } from 'react';
import { FolderSelect } from './FolderSelect';
import { PlusIcon } from '@radix-ui/react-icons';
import { PUBLIC_DOMAIN } from '@/constants';

export function UpdatePickForm({
  id,
  title,
  imageUrl,
  folderId,
  folderInfoList,
}: UpdatePickFormProps) {
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

  const currentSelectedFolderInfo = folderInfoList.find(
    (folder) => folder.id === folderId
  );
  const [selectedFolderId, setSelectedFolderId] = useState(
    `${currentSelectedFolderInfo?.id ?? folderInfoList[0].id}`
  );

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const onSubmit = () => {
    const userModifiedTitle = titleInputRef.current?.value ?? '';

    if (userModifiedTitle.trim() === '') {
      notifyError('제목이 비어있는 상태로 수정할 수 없습니다.');
      return;
    }

    updatePick({
      id,
      title: DOMPurify.sanitize(userModifiedTitle.trim()),
      tagIdOrderedList: selectedTagList.map((tag) => tag.id),
      parentFolderId: Number(selectedFolderId),
    })
      .then(() => {
        notifySuccess('수정되었습니다!');
        setTimeout(() => {
          window.close();
        }, 900);
      })
      .catch(() => {
        notifyError(`북마크가 실패했습니다!`);
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
          <a href={PUBLIC_DOMAIN} className={footerLinkStyle} target="_blank">
            <p className={footerLinkTextStyle}>app.techpick.org</p>
          </a>
          <p className={footerTextStyle}>수정하기</p>
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

interface UpdatePickFormProps {
  id: number;
  title: string;
  imageUrl: string;
  folderId: number;
  folderInfoList: FolderType[];
}
