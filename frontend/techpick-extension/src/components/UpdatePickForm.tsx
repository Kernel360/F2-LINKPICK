import DOMPurify from 'dompurify';
import { notifyError, notifySuccess } from '@/libs/@toast';
import { useChangeFocusUsingArrowKey } from '@/hooks';
import { useTagStore } from '@/stores';
import { FolderType, TagType } from '@/types';
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
} from './CreatePickForm.css';
import { useEffect, useRef, useState } from 'react';
import { FolderSelect } from './FolderSelect';
import { PlusIcon } from '@radix-ui/react-icons';
import { PUBLIC_DOMAIN } from '@/constants';

export function UpdatePickForm({
  id,
  title,
  tagList,
  imageUrl,
  folderId,
  folderInfoList,
}: UpdatePickFormProps) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const tagPickerRef = useRef<HTMLDivElement>(null);
  const folderSelectRef = useRef<HTMLButtonElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { selectedTagList, replaceSelectedTagList } = useTagStore();
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

  useEffect(
    function onUpdatePickFormLoad() {
      replaceSelectedTagList(tagList);
    },
    [tagList, replaceSelectedTagList]
  );

  const onSubmit = () => {
    const userModifiedTitle = titleInputRef.current?.value ?? '';

    updatePick({
      id,
      title: DOMPurify.sanitize(userModifiedTitle),
      tagIdOrderedList: selectedTagList.map((tag) => tag.id),
    })
      .then(() => {
        notifySuccess('수정되었습니다!');
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

interface UpdatePickFormProps {
  id: number;
  title: string;
  tagList: TagType[];
  imageUrl: string;
  folderId: number;
  folderInfoList: FolderType[];
}
