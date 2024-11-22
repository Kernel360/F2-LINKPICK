import { Button } from '@/libs/@components';
import type { TagType } from '@/types';
import { useDeleteTagDialogStore } from '@/stores';

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
