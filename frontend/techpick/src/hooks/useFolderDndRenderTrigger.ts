'use client';

import { useFolderStore } from '@/stores/folderStore';
import { useEffect, useState } from 'react';

/**
 * useFolderDndRenderTrigger는 folder가 dragging이 끝나면 해당 이벤트를 감지해서 dnd가 끝난 상태를 렌더링하게 합니다.
 *
 * 이는 optimistic update가 동작해도 뒤늦게 렌더링이 적용되어 이전 상태가 보여지는 것을 막기 위해서 구현했습니다.
 *
 * @author 김승태
 */
export function useFolderDndRenderTrigger() {
  const [_renderTrigger, setRenderTrigger] = useState(false); // 렌더링 트리거

  useEffect(() => {
    const unsubscribe = useFolderStore.subscribe(
      (state) => state.isDragging,
      (isDragging) => {
        if (!isDragging) {
          // 드래그 종료 시 렌더링 트리거
          setRenderTrigger((prev) => !prev);
        }
      },
    );

    return () => unsubscribe();
  }, []);
}
