import { useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';
import { useCreateFolderInputStore } from '@/stores/createFolderInputStore';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { isEmptyString } from '@/utils';
import {
  createFolderInputLayout,
  inputStyle,
  labelStyle,
} from './createFolderInput.css';

export function CreateFolderInput({ parentFolderId }: CreateFolderInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { createFolder: createFolderInStore } = useTreeStore();
  const { closeCreateFolderInput } = useCreateFolderInputStore();

  const createFolder = () => {
    const folderName = inputRef.current?.value.trim() ?? '';

    if (isEmptyString(folderName)) return;

    createFolderInStore({ parentFolderId, newFolderName: folderName });
    closeCreateFolderInput();
  };

  const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createFolder();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        createFolder();
        closeCreateFolderInput();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className={createFolderInputLayout}>
      <label htmlFor="" className={labelStyle}>
        <Plus size={16} />
      </label>
      <input
        type="text"
        ref={inputRef}
        className={inputStyle}
        onKeyDown={onEnter}
      />
    </div>
  );
}

interface CreateFolderInputProps {
  parentFolderId: number;
}
