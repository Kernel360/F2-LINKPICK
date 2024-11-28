'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close,
} from '@radix-ui/react-dialog';
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
    <Portal>
      <Overlay className={moveRecycleBinOverlayStyle} />
      <Content className={moveRecycleDialogContent}>
        <div>
          <Title className={moveRecycleBinDialogTitleStyle}>
            폴더를 휴지통으로 이동하시겠습니다?
          </Title>

          <Description className={moveRecycleBinDialogDescriptionStyle}>
            픽은 남지만 폴더는 사라집니다.
          </Description>
        </div>

        <Close asChild>
          <button className={moveRecycleBinDialogCloseButton}>
            <XIcon size={12} />
          </button>
        </Close>

        <div>
          <Close asChild>
            <button
              className={moveRecycleBinConfirmButtonStyle}
              onClick={moveRecycleBinAndRedirect}
            >
              이 폴더를 삭제합니다.
            </button>
          </Close>

          <Close asChild>
            <button className={moveRecycleBinCancelButtonStyle}>취소</button>
          </Close>
        </div>
      </Content>
    </Portal>
  );
}

interface MoveFolderToRecycleBinDialogProps {
  deleteFolderId: number;
}
