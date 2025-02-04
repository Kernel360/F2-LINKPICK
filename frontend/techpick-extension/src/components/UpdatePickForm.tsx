import { createPick } from '@/apis/createPick';
import { PUBLIC_DOMAIN } from '@/constants/publicDomain';
import { useChangeFocusUsingArrowKey } from '@/hooks/useChangeFocusUsingArrowKey';
import { useEventLogger } from '@/hooks/useEventLogger';
import { notifyError } from '@/libs/@toast/notifyError';
import { notifySuccess } from '@/libs/@toast/notifySuccess';
import { useTagStore } from '@/stores/tagStore';
import type { FolderType } from '@/types/FolderType';
import { setFolderIdToLocalhost } from '@/utils/setFolderIdToLocalhost';
import { PlusIcon } from '@radix-ui/react-icons';
import DOMPurify from 'dompurify';
import { useEffect, useRef, useState } from 'react';
import { FolderSelect } from './FolderSelect';
import { TagPicker } from './TagPicker';
import { ThumbnailImage } from './ThumbnailImage';
import {
  footerLinkStyle,
  footerLinkTextStyle,
  footerStyle,
  footerTextStyle,
  formFieldLayout,
  pickFormFieldListLayout,
  pickFormLayout,
  plusIconStyle,
  submitButtonStyle,
  titleInputStyle,
} from './UpdatePickForm.css';

export function UpdatePickForm({
  title: initialTitle,
  imageUrl,
  url,
  folderInfoList,
  localhostFolderId,
}: UpdatePickFormProps) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const tagPickerRef = useRef<HTMLDivElement>(null);
  const folderSelectRef = useRef<HTMLButtonElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { selectedTagList } = useTagStore();
  const { trackEvent: trackSaveBookmark } = useEventLogger({
    eventName: 'extension_save_bookmark',
  });
  const { trackEvent: trackUpdateTag } = useEventLogger({
    eventName: 'extension_update_tag',
  });

  useChangeFocusUsingArrowKey([
    titleInputRef,
    tagPickerRef,
    folderSelectRef,
    submitButtonRef,
  ]);

  // TODO: 가장 최근에 저장한 폴더를 가져와야한다.
  const currentSelectedFolderInfo = folderInfoList.find(
    (folder) => folder.id === localhostFolderId,
  );

  const [selectedFolderId, setSelectedFolderId] = useState(
    `${currentSelectedFolderInfo?.id ?? folderInfoList[0].id}`,
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

    if (0 < selectedTagList.length) {
      // 태그를 직접 추가하는지 확인하는 이벤트입니다.
      const selectedTagNameList = selectedTagList.map((tag) => tag.name);
      trackUpdateTag({ tagList: selectedTagNameList });
    }

    trackSaveBookmark();

    const parsedSelectedFolderId = Number(selectedFolderId);

    createPick({
      url,
      linkTitle: initialTitle,
      title: DOMPurify.sanitize(userModifiedTitle.trim()),
      tagIdOrderedList: selectedTagList.map((tag) => tag.id),
      parentFolderId: parsedSelectedFolderId,
    })
      .then(() => {
        setFolderIdToLocalhost(parsedSelectedFolderId);
        notifySuccess('추가되었습니다!');
        setTimeout(() => {
          window.close();
        }, 600);
      })
      .catch(() => {
        notifyError('북마크가 실패했습니다!');
      });
  };

  return (
    <form className={pickFormLayout} onSubmit={(e) => e.preventDefault()}>
      <div className={pickFormFieldListLayout}>
        <div className={formFieldLayout}>
          <ThumbnailImage image={imageUrl} />
          <input
            type="text"
            defaultValue={initialTitle}
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
          <a
            href={PUBLIC_DOMAIN}
            className={footerLinkStyle}
            target="_blank"
            rel="noreferrer"
          >
            <p className={footerLinkTextStyle}>app.baguni.kr</p>
          </a>
          <p className={footerTextStyle}>수정하기</p>
        </div>
      </div>
      <button
        type="submit"
        className={submitButtonStyle}
        onClick={() => {
          onSubmit();
        }}
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
  title: string;
  imageUrl?: string;
  url: string;
  folderInfoList: FolderType[];
  localhostFolderId: number | undefined | null;
}
