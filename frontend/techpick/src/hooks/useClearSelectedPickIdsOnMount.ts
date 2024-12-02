'use client';

import { useEffect } from 'react';
import { usePickStore } from '@/stores';

export function useClearSelectedPickIdsOnMount() {
  const { setSelectedPickIdList } = usePickStore();

  useEffect(
    function clearSelectedPickIdsOnMount() {
      setSelectedPickIdList([]);
    },
    [setSelectedPickIdList]
  );
}
