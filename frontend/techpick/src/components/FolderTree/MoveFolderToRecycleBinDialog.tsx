'use client';

import { ROUTES } from '@/constants/route';
import { useDeleteFolder } from '@/queries/useDeleteFolder';
import { useFetchFolders } from '@/queries/useFetchFolders';
import { dialogOverlayStyle } from '@/styles/dialogStyle.css';
import { checkIsSharedFolder } from '@/utils/checkIsSharedFolder';
import * as Dialog from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useRef } from 'react';
import {
  moveRecycleBinCancelButtonStyle,
  moveRecycleBinConfirmButtonStyle,
  moveRecycleBinDialogCloseButton,
  moveRecycleBinDialogDescriptionStyle,
  moveRecycleBinDialogShareFolderWarningDescriptionStyle,
  moveRecycleBinDialogTitleStyle,
  moveRecycleDialogContent,
} from './moveFolderToRecycleBinDialog.css';

export function MoveFolderToRecycleBinDialog({
  deleteFolderId,
  isOpen,
  onOpenChange,
}: MoveFolderToRecycleBinDialogProps) {
  const router = useRouter();
  const { folderId: urlFolderId } = useParams<{ folderId: string }>();
  const { data: folderRecord } = useFetchFolders();
  const { mutate: deleteFolder } = useDeleteFolder();
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const isSharedFolder = checkIsSharedFolder({
    folderId: deleteFolderId,
    folderRecord,
  });

  const moveRecycleBinAndRedirect = () => {
    deleteFolder([deleteFolderId]);

    if (Number(urlFolderId) === deleteFolderId) {
      router.push(ROUTES.RECOMMEND);
    }
  };

  const handleMouseEnter = (ref: React.RefObject<HTMLButtonElement>) => {
    ref.current?.focus();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogOverlayStyle} />
        <Dialog.Content className={moveRecycleDialogContent}>
          <div>
            <Dialog.Title className={moveRecycleBinDialogTitleStyle}>
              폴더를 휴지통으로 이동하시겠습니다?
            </Dialog.Title>

            {isSharedFolder && (
              <Dialog.Description
                className={
                  moveRecycleBinDialogShareFolderWarningDescriptionStyle
                }
              >
                현재 공개중인 폴더입니다.
                <br />
                공유 폴더가 해제되며, 외부에서 더이상 접근할 수 없습니다.
              </Dialog.Description>
            )}

            <Dialog.Description
              className={moveRecycleBinDialogDescriptionStyle}
            >
              북마크는 남지만 폴더는 사라집니다.
            </Dialog.Description>
          </div>

          <Dialog.Close asChild>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              ref={deleteButtonRef}
              onMouseEnter={() => handleMouseEnter(deleteButtonRef)}
              className={moveRecycleBinDialogCloseButton}
            >
              <XIcon size={12} />
            </button>
          </Dialog.Close>

          <div>
            <Dialog.Close asChild>
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button
                className={moveRecycleBinConfirmButtonStyle}
                onClick={moveRecycleBinAndRedirect}
                ref={deleteButtonRef}
                onMouseEnter={() => handleMouseEnter(deleteButtonRef)}
              >
                이 폴더를 삭제합니다.
              </button>
            </Dialog.Close>

            <Dialog.Close asChild>
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button
                ref={cancelButtonRef}
                onMouseEnter={() => handleMouseEnter(cancelButtonRef)}
                className={moveRecycleBinCancelButtonStyle}
              >
                취소
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface MoveFolderToRecycleBinDialogProps {
  deleteFolderId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
