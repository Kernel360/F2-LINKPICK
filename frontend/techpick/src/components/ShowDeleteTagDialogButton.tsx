'use client';

import { Button } from '@/components/Button/Button';
import { useDeleteTagDialogStore } from '@/stores/deleteTagDialogStore';
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
    <Button onClick={showDeleteTagDialog} size="xs" background="warning" wide>
      삭제
    </Button>
  );
}

interface ShowDeleteTagDialogButtonProps {
  tag: TagType;
  onClick?: () => void;
}
