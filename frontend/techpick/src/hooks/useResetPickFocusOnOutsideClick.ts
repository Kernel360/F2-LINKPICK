'use client';

import { useCallback, useEffect } from 'react';
import { usePickStore } from '@/stores';

export function useResetPickFocusOnOutsideClick() {
  const setSelectedPickIdList = usePickStore(
    (state) => state.setSelectedPickIdList
  );

  const resetFocus = useCallback(
    (e: MouseEvent) => {
      if (
        e.target instanceof Element &&
        e.target.closest('[data-pick-draggable="true"]') // draggable item에 추가해야합니다.
      ) {
        return;
      }

      setSelectedPickIdList([]);
    },
    [setSelectedPickIdList]
  );

  useEffect(
    function addResetFocusOnOutsideClickEvent() {
      window.addEventListener('mousedown', resetFocus);

      return () => {
        window.removeEventListener('mousedown', resetFocus);
      };
    },
    [resetFocus]
  );
}
