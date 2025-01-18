'use client';

import { useCreateFolderInputStore } from '@/stores/createFolderInputStore';
import { Plus } from 'lucide-react';
import { buttonStyle } from './showCreateFolderInputButton.css';

export function ShowCreateFolderInputButton({
  newFolderParentId,
}: ShowCreateFolderInputButtonProps) {
  const { setNewFolderParentId } = useCreateFolderInputStore();

  const onClick = () => {
    setNewFolderParentId(newFolderParentId);
  };

  return (
    // biome-ignore lint/a11y/useButtonType: <explanation>
    <button onClick={onClick} className={buttonStyle}>
      <Plus size={20} />
    </button>
  );
}

interface ShowCreateFolderInputButtonProps {
  newFolderParentId: number;
}
