import { useCallback, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { isEmptyString } from '@/utils';
import {
  pickTitleInputStyle,
  pickRecordTitleInputLayoutStyle,
} from './pickRecordTitleInput.css';

export function PickRecordTitleInput({
  onSubmit,
  onClickOutSide = () => {},
  initialValue = '',
}: PickRecordTitleInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const submitIfNotEmptyString = useCallback(() => {
    const pickTitle = textAreaRef.current?.value.trim() ?? '';
    if (isEmptyString(pickTitle)) return;

    onSubmit(pickTitle);
  }, [onSubmit]);

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      return;
    }

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
    function initializePickRecordTitleInput() {
      if (textAreaRef.current) {
        textAreaRef.current.value = initialValue;

        textAreaRef.current?.focus();
        // 커서를 텍스트의 끝으로 이동
        textAreaRef.current?.setSelectionRange(
          initialValue.length,
          initialValue.length
        );
      }
    },
    [initialValue]
  );

  return (
    <div
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
      className={pickRecordTitleInputLayoutStyle}
    >
      <TextareaAutosize
        ref={textAreaRef}
        defaultValue={initialValue}
        onKeyDown={onKeyDown}
        className={pickTitleInputStyle}
      />
    </div>
  );
}

interface PickRecordTitleInputProps {
  onSubmit: (value: string) => void;
  onClickOutSide?: () => void;
  initialValue?: string;
}
