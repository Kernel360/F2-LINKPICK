import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function useSearchElementId() {
  const searchElementId = useSearchParams().get('searchId');

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

  return searchElementId;
}
