'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useSearchElementId() {
  const searchElementId = useSearchParams().get('searchId');
  const [isOccurClickEvent, setIsOccerClickEvent] = useState<boolean>(false);

  useEffect(() => {
    const handleSearchElementIdChange = () => {
      if (!searchElementId) return;

      const targetElement = document.querySelector(`#${searchElementId}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const handleClick = () => {
      setIsOccerClickEvent(true);
    };

    handleSearchElementIdChange();
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      setIsOccerClickEvent(false);
    };
  }, [searchElementId]);

  return {
    searchElementId,
    isOccurClickEvent,
  };
}
