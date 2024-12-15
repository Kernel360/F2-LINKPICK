'use client';

import { useCallback, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { XIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { uploadBookmark } from '@/apis/bookmark';
import { useTreeStore } from '@/stores';
import { notifyError, notifySuccess } from '@/utils';
import {
  importBookmarkDialogButtonStyle,
  overlayStyle,
  dialogContent,
  dropzoneStyle,
  closeButtonStyle,
  submitButtonStyle,
  dragInfoTextStyle,
  fileDescriptionLayoutStyle,
  fileDescriptionTextStyle,
} from './importBookmarkDialog.css';
import type { DropzoneOptions } from 'react-dropzone';

export function ImportBookmarkDialog() {
  const getFolders = useTreeStore((state) => state.getFolders);
  const [file, setFile] = useState<HTMLFile | null>(null);
  const onDrop = useCallback<NonNullable<DropzoneOptions['onDrop']>>(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        notifySuccess(`${acceptedFiles[0].name}을 선택하였습니다!`);
      }
    },
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/html': ['.html'] },
    multiple: false,
  });
  const isUploadingFile = useRef(false);

  const handleUpload = async () => {
    if (isUploadingFile.current) {
      return;
    }

    if (!file) {
      notifyError('파일을 추가하고 제출해주세요!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    isUploadingFile.current = true;
    try {
      const response = await uploadBookmark(formData);
      getFolders();

      if (0 < response.length) {
        notifySuccess(
          '파일 업로드에 성공했습니다!\n이미 존재하는 파일은 생성되지 않았습니다.'
        );
      } else {
        notifySuccess('파일 업로드에 성공했습니다!');
      }
    } catch {
      notifyError('죄송합니다. 파일 업로드에 실패하였습니다.');
    } finally {
      isUploadingFile.current = false;
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={importBookmarkDialogButtonStyle}>
          북마크 업로드
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={overlayStyle} />
        <Dialog.Content className={dialogContent}>
          <VisuallyHidden.Root>
            <Dialog.Title className="DialogTitle">북마크 가져오기</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              브라우저에서 export한 html파일을 추가해주세요.
            </Dialog.Description>
          </VisuallyHidden.Root>

          <div {...getRootProps()} className={dropzoneStyle}>
            <input {...getInputProps()} />
            <p className={dragInfoTextStyle}>
              {isDragActive
                ? '파일을 여기에 놓으세요.'
                : 'HTML 파일을 드래그 앤 드롭 하거나\n클릭하여 선택하세요.'}
            </p>
          </div>
          <div className={fileDescriptionLayoutStyle}>
            {file && (
              <p className={fileDescriptionTextStyle}>
                선택된 파일: {file.name}
              </p>
            )}
          </div>

          <button onClick={handleUpload} className={submitButtonStyle}>
            제출
          </button>

          <Dialog.Close asChild className={closeButtonStyle} aria-label="Close">
            <button>
              <XIcon size={12} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface HTMLFile extends File {
  type: string;
}
