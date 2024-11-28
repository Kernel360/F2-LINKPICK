'use client';

import { useCallback, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { isEmptyString } from '@/utils';
import { pickTitleInputStyle } from './pickTitleInput.css';

export function PickTitleInput({
  onSubmit,
  onClickOutSide = () => {},
  initialValue = '',
}: PickTitleInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitIfNotEmptyString = useCallback(() => {
    const pickTitle = inputRef.current?.value.trim() ?? '';
    if (isEmptyString(pickTitle)) return;

    onSubmit(pickTitle);
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
    <div ref={containerRef} onClick={(e) => e.stopPropagation()}>
      <input
        type="text"
        ref={inputRef}
        onKeyDown={onEnter}
        className={pickTitleInputStyle}
      />
    </div>
  );
}

interface PickTitleInputProps {
  onSubmit: (value: string) => void;
  onClickOutSide?: () => void;
  initialValue?: string;
}
