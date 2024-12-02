'use client';

import { Plus } from 'lucide-react';
import { useCreateFolderInputStore } from '@/stores/createFolderInputStore';
import { buttonStyle } from './showCreateFolderInputButton.css';

export function ShowCreateFolderInputButton({
  newFolderParentId,
}: ShowCreateFolderInputButtonProps) {
  const { setNewFolderParentId } = useCreateFolderInputStore();

  const onClick = () => {
    setNewFolderParentId(newFolderParentId);
  };

  return (
    <button onClick={onClick} className={buttonStyle}>
      <Plus size={24} />
    </button>
  );
}

interface ShowCreateFolderInputButtonProps {
  newFolderParentId: number;
}
