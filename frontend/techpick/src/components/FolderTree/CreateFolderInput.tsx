import { useCallback, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { FolderPlus } from 'lucide-react';
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

  const createFolder = useCallback(() => {
    const folderName = inputRef.current?.value.trim() ?? '';

    if (isEmptyString(folderName)) return;

    createFolderInStore({ parentFolderId, newFolderName: folderName });
    closeCreateFolderInput();
  }, [closeCreateFolderInput, createFolderInStore, parentFolderId]);

  const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createFolder();
    }
  };

  useEffect(
    function detectOutsideClick() {
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
    },
    [closeCreateFolderInput, createFolder]
  );

  useEffect(function focusCreateFolderInput() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div ref={containerRef} className={createFolderInputLayout}>
      <label htmlFor="" className={labelStyle}>
        <FolderPlus size={24} />
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
