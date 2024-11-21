'use client';

import { useDeleteTagDialogStore } from '@/stores';
import { Button } from '../Button';
import type { TagType } from '@/types';

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
    <Button
      onClick={showDeleteTagDialog}
      size="xs"
      background="warning"
      color="black"
      wide
    >
      삭제
    </Button>
  );
}

interface ShowDeleteTagDialogButtonProps {
  tag: TagType;
  onClick?: () => void;
}
