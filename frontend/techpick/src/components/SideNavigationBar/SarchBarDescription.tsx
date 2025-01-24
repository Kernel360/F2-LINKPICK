'use client';

import { isMacOS } from '@/utils/isMacOS';
import { useEffect, useState } from 'react';
import { searchBarDescriptionStyle } from './searchBar.css';

export function SearchBarDescription() {
  const [isMac, setIsMac] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsMac(isMacOS());
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // 또는 로딩 상태를 표시할 수 있습니다.
  }

  return (
    <span className={searchBarDescriptionStyle}>
      {isClient ? (isMac ? 'press command + p' : 'press control + k') : null}
    </span>
  );
}
