import { memo, KeyboardEvent, MouseEvent, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Text, Gap } from '@/libs/@components';
import { useTagStore, useDeleteTagDialogStore } from '@/stores';
import {
  deleteTagDialogButtonStyle,
  deleteTagDialogCancelButtonStyle,
  dialogContentStyle,
  dialogOverlayStyle,
} from './DeleteTagDialog.css';

export const DeleteTagDialog = memo(function DeleteTagDialog() {
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const { deleteTag } = useTagStore();
  const { deleteTagId, isOpen, setIsOpen } = useDeleteTagDialogStore();

  const closeDialog = () => {
    setIsOpen(false);
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
    if (e.key === 'Enter') {
      e.stopPropagation();
      await handleDeleteTag();
    }
  };

  const closeDialogByEnterKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      closeDialog();
    }
  };

  const handleMouseEnter = (ref: React.RefObject<HTMLButtonElement>) => {
    ref.current?.focus();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal container={document.querySelector('#portalContainer')}>
        <Dialog.Overlay className={dialogOverlayStyle} />
        <Dialog.Content className={dialogContentStyle}>
          <Text>이 태그를 삭제하시겠습니까?</Text>

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
              ref={deleteButtonRef}
              onMouseEnter={() => handleMouseEnter(deleteButtonRef)}
              className={deleteTagDialogButtonStyle}
            >
              삭제
            </button>
            <Gap verticalSize="gap4" />
            <button
              onClick={closeDialog}
              onKeyDown={closeDialogByEnterKey}
              ref={cancelButtonRef}
              onMouseEnter={() => handleMouseEnter(cancelButtonRef)}
              className={deleteTagDialogCancelButtonStyle}
            >
              취소
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
