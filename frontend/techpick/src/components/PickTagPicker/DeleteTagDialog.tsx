'use client';

import { useRef, memo, KeyboardEvent, MouseEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { PORTAL_CONTAINER_ID } from '@/constants';
import { useTagStore, useDeleteTagDialogStore } from '@/stores';
import { Text } from '@/ui/Text/Text';
import { getElementById } from '@/utils';
import { Gap } from '../Gap';
import {
  dialogContentStyle,
  dialogOverlayStyle,
  deleteTagButtonStyle,
  deleteTagCancelButtonStyle,
} from './DeleteTagDialog.css';

export const DeleteTagDialog = memo(function DeleteTagDialog() {
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const { deleteTag } = useTagStore();
  const { deleteTagId, isOpen, setIsOpen } = useDeleteTagDialogStore();
  const portalContainer = getElementById(PORTAL_CONTAINER_ID);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const closeDialogByEnterKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (event.key === 'Enter') {
      closeDialog();
    }
  };

  const handleDeleteTag = async () => {
    if (!deleteTagId) {
      return;
    }

    closeDialog();
    await deleteTag(deleteTagId);
  };

  const DeleteTagByClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await handleDeleteTag();
  };

  const DeleteTagByEnterKey = async (e: KeyboardEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      await handleDeleteTag();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal container={portalContainer}>
        <Dialog.Overlay className={dialogOverlayStyle} />
        <Dialog.Content className={dialogContentStyle}>
          <Text size="sm" weight="light">
            이 태그를 삭제하시겠습니까?
          </Text>

          <VisuallyHidden.Root>
            <Dialog.Title>이 태그를 삭제하시겠습니까?</Dialog.Title>
            <Dialog.Description>
              태그를 삭제하실 거라면 삭제 버튼을 눌러주세요.
            </Dialog.Description>
          </VisuallyHidden.Root>

          <div>
            <button
              onClick={DeleteTagByClick}
              onKeyDown={DeleteTagByEnterKey}
              className={deleteTagButtonStyle}
            >
              삭제
            </button>

            <Gap verticalSize="gap4" />
            <Dialog.Close asChild>
              <button
                ref={cancelButtonRef}
                onClick={closeDialog}
                onKeyDown={closeDialogByEnterKey}
                className={deleteTagCancelButtonStyle}
              >
                취소
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
