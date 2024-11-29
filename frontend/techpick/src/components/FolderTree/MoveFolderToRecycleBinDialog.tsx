'use client';

import { useParams, useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { ROUTES } from '@/constants';
import { useTreeStore } from '@/stores';
import {
  moveRecycleBinCancelButtonStyle,
  moveRecycleBinConfirmButtonStyle,
  moveRecycleBinDialogCloseButton,
  moveRecycleBinDialogDescriptionStyle,
  moveRecycleBinDialogTitleStyle,
  moveRecycleBinOverlayStyle,
  moveRecycleDialogContent,
} from './moveFolderToRecycleBinDialog.css';

export function MoveFolderToRecycleBinDialog({
  deleteFolderId,
  isOpen,
  onOpenChange,
}: MoveFolderToRecycleBinDialogProps) {
  const router = useRouter();
  const { folderId: urlFolderId } = useParams<{ folderId: string }>();
  const moveFolderToRecycleBin = useTreeStore(
    (state) => state.moveFolderToRecycleBin
  );

  const moveRecycleBinAndRedirect = () => {
    moveFolderToRecycleBin({ deleteFolderId });

    if (Number(urlFolderId) === deleteFolderId) {
      router.push(ROUTES.FOLDERS_UNCLASSIFIED);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={moveRecycleBinOverlayStyle} />
        <Dialog.Content className={moveRecycleDialogContent}>
          <div>
            <Dialog.Title className={moveRecycleBinDialogTitleStyle}>
              폴더를 휴지통으로 이동하시겠습니다?
            </Dialog.Title>

            <Dialog.Description
              className={moveRecycleBinDialogDescriptionStyle}
            >
              픽은 남지만 폴더는 사라집니다.
            </Dialog.Description>
          </div>

          <Dialog.Close asChild>
            <button className={moveRecycleBinDialogCloseButton}>
              <XIcon size={12} />
            </button>
          </Dialog.Close>

          <div>
            <Dialog.Close asChild>
              <button
                className={moveRecycleBinConfirmButtonStyle}
                onClick={moveRecycleBinAndRedirect}
              >
                이 폴더를 삭제합니다.
              </button>
            </Dialog.Close>

            <Dialog.Close asChild>
              <button className={moveRecycleBinCancelButtonStyle}>취소</button>
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
