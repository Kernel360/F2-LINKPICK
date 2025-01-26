'use client';

import { useFetchFolders } from '@/queries/useFetchFolders';
import { useFolderStore } from '@/stores/folderStore';
import { useEffect } from 'react';

/**
 * TanStack Query에서 받아온 FolderRecord을 zustand store에 동기화합니다.
 *
 * 이렇게 하는 이유는 dnd 동작 시에 즉각적인 상태변화가 적용이 되야하지만,
 *
 * TanStack Query의 긍정적 업데이트보다, dnd-kit의 상태 렌더링이 먼저 적용되기 때문입니다.
 *
 * 따라서 이곳에서 먼저 update를 하고 그 화면을 보여줍니다.
 *
 */
export function useSyncFolderRecord() {
  const { data: folderRecord = {} } = useFetchFolders();
  const setFolderRecord = useFolderStore((state) => state.setFolderRecord);

  useEffect(
    function syncFolderStore() {
      setFolderRecord(folderRecord);
    },
    [folderRecord, setFolderRecord],
  );
}
