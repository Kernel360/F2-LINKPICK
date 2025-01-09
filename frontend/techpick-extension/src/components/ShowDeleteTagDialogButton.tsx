import type { TagType } from '@/types';
import { useDeleteTagDialogStore } from '@/stores';
import { deleteTagDialogButtonStyle } from './ShowDeleteTagDialogButton.css';

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
