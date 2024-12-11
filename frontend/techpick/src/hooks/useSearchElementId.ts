import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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

    handleSearchElementIdChange();
  }, [searchElementId]);

  useEffect(() => {
    const handleClick = () => {
      setIsOccerClickEvent(true);
    };

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
