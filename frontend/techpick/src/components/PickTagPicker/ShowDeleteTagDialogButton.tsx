'use client';

import { useDeleteTagDialogStore } from '@/stores/deleteTagDialogStore';
import type { TagType } from '@/types/TagType';
import { deleteTagDialogButtonStyle } from './showDeleteTagDialogButton.css';

export function ShowDeleteTagDialogButton({
  tag,
  onClick: parentOnClick = () => {},
}: ShowDeleteTagDialogButtonProps) {
  const { setIsOpen, setDeleteTagId } = useDeleteTagDialogStore();

  const showDeleteTagDialog = () => {
    setIsOpen(true);
    setDeleteTagId(tag.id);
    parentOnClick();
  };

  return (
    // biome-ignore lint/a11y/useButtonType: <explanation>
    <button
      onClick={showDeleteTagDialog}
      className={deleteTagDialogButtonStyle}
    >
      삭제
    </button>
  );
}

interface ShowDeleteTagDialogButtonProps {
  tag: TagType;
  onClick?: () => void;
}
