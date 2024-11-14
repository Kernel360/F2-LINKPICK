import { useCallback, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { FolderPlus } from 'lucide-react';
import { isEmptyString } from '@/utils';
import { folderInputLayout, inputStyle, labelStyle } from './folderInput.css';

export function FolderInput({
  onSubmit,
  onClickOutSide = () => {},
  initialValue = '',
}: FolderInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitIfNotEmptyString = useCallback(() => {
    const folderName = inputRef.current?.value.trim() ?? '';
    if (isEmptyString(folderName)) return;

    onSubmit(folderName);
  }, [onSubmit]);

  const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitIfNotEmptyString();
    }
  };

  useEffect(
    function detectOutsideClick() {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          submitIfNotEmptyString();
          onClickOutSide();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    },
    [onClickOutSide, submitIfNotEmptyString]
  );

  useEffect(
    function initializeFolderInput() {
      if (inputRef.current) {
        inputRef.current.value = initialValue;

        // 타이밍 이슈 탓으로 인해 setTimeout 사용
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    },
    [initialValue]
  );

  return (
    <div ref={containerRef} className={folderInputLayout}>
      <label htmlFor="folderInput" className={labelStyle}>
        <FolderPlus size={24} />
      </label>
      <input
        id="folderInput"
        type="text"
        ref={inputRef}
        className={inputStyle}
        onKeyDown={onEnter}
      />
    </div>
  );
}

interface FolderInputProps {
  onSubmit: (value: string) => void;
  onClickOutSide?: () => void;
  initialValue?: string;
}
