'use client';

import { usePickStore } from '@/stores/pickStore/pickStore';
import { useEffect } from 'react';

export function useClearSelectedPickIdsOnMount() {
  const { setSelectedPickIdList } = usePickStore();

  useEffect(
    function clearSelectedPickIdsOnMount() {
      setSelectedPickIdList([]);
    },
    [setSelectedPickIdList],
  );
}
