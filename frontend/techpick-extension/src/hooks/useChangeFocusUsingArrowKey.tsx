import { hasIndex } from '@/utils';
import { RefObject, useCallback, useEffect } from 'react';

export function useChangeFocusUsingArrowKey(refList: RefObject<HTMLElement>[]) {
  const focusElement = useCallback(
    (index: number) => {
      if (refList[index]?.current) {
        refList[index].current!.focus();
      }
    },
    [refList]
  );

  const findFocusedIndex = useCallback(() => {
    return refList.findIndex((ref) => ref.current === document.activeElement);
  }, [refList]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const currentFocusedIndex = findFocusedIndex();

      if (!hasIndex(currentFocusedIndex)) {
        return;
      }

      if (event.key === 'ArrowDown') {
        const nextIndex =
          currentFocusedIndex === refList.length - 1
            ? currentFocusedIndex
            : currentFocusedIndex + 1;

        focusElement(nextIndex);
      } else if (event.key === 'ArrowUp') {
        const nextIndex =
          currentFocusedIndex === 0
            ? currentFocusedIndex
            : currentFocusedIndex - 1;

        focusElement(nextIndex);
      }
    },
    [focusElement, findFocusedIndex, refList.length]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusElement, findFocusedIndex, handleKeyDown]);
}
