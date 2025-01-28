'use client';

import { usePickStore } from '@/stores/pickStore';
import { useEffect } from 'react';

export function useClearSelectedPickIdsOnMount() {
  const setSelectedPickIdList = usePickStore(
    (state) => state.setSelectedPickIdList,
  );

  useEffect(
    function clearSelectedPickIdsOnMount() {
      setSelectedPickIdList([]);
    },
    [setSelectedPickIdList],
  );
}
