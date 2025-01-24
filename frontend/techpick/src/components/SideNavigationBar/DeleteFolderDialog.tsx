'use client';

import { ROUTES } from '@/constants/route';
import { useDeleteFolder } from '@/queries/useDeleteFolder';
import { useFetchFolders } from '@/queries/useFetchFolders';
import { dialogOverlayStyle } from '@/styles/dialogStyle.css';
import type { FolderIdType } from '@/types/FolderIdType';
import { checkIsSharedFolder } from '@/utils/checkIsSharedFolder';
import * as Dialog from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext, useRef } from 'react';
import { ActiveNavigationItemIdContext } from './ActiveNavigationItemIdProvider';
import { DeleteFolderStatusContext } from './DeleteFolderStatusProvider';
import {
  deleteDialogContentStyle,
  deleteFolderCancelButtonStyle,
  deleteFolderConfirmButtonStyle,
  deleteFolderDialogCloseButton,
  deleteFolderDialogDescriptionStyle,
  deleteFolderDialogShareFolderWarningDescriptionStyle,
  deleteFolderDialogTitleStyle,
} from './deleteFolderDialog.css';

export function DeleteFolderDialog({
  deleteFolderId,
}: DeleteFolderDialogProps) {
  const router = useRouter();
  const activeNavigationItemId = useContext(ActiveNavigationItemIdContext);
  const { isOpenDeleteFolderDialog, onCloseDeleteFolderDialog } = useContext(
    DeleteFolderStatusContext,
  );
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

    if (activeNavigationItemId === deleteFolderId) {
      router.push(ROUTES.RECOMMEND);
    }
  };

  const handleMouseEnter = (ref: React.RefObject<HTMLButtonElement>) => {
    ref.current?.focus();
  };

  return (
    <Dialog.Root
      open={isOpenDeleteFolderDialog}
      onOpenChange={onCloseDeleteFolderDialog}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={dialogOverlayStyle} />
        <Dialog.Content className={deleteDialogContentStyle}>
          <div>
            <Dialog.Title className={deleteFolderDialogTitleStyle}>
              폴더를 휴지통으로 이동하시겠습니다?
            </Dialog.Title>

            {isSharedFolder && (
              <Dialog.Description
                className={deleteFolderDialogShareFolderWarningDescriptionStyle}
              >
                현재 공개중인 폴더입니다.
                <br />
                공유 폴더가 해제되며, 외부에서 더이상 접근할 수 없습니다.
              </Dialog.Description>
            )}

            <Dialog.Description className={deleteFolderDialogDescriptionStyle}>
              북마크는 남지만 폴더는 사라집니다.
            </Dialog.Description>
          </div>

          <Dialog.Close asChild>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              ref={deleteButtonRef}
              onMouseEnter={() => handleMouseEnter(deleteButtonRef)}
              className={deleteFolderDialogCloseButton}
            >
              <XIcon size={12} />
            </button>
          </Dialog.Close>

          <div>
            <Dialog.Close asChild>
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button
                className={deleteFolderConfirmButtonStyle}
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
                className={deleteFolderCancelButtonStyle}
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

interface DeleteFolderDialogProps {
  deleteFolderId: FolderIdType;
}
