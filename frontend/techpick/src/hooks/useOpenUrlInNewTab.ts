'use client';

import { useCallback } from 'react';

export function useOpenUrlInNewTab(url: string) {
  const openUrlInNewTab = useCallback(() => {
    window.open(url, '_blank');
  }, [url]);

  return { openUrlInNewTab };
}
