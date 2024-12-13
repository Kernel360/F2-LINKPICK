import { useEffect, useState } from 'react';
import { getPickByUrl } from '@/apis';
import { PickInfoType } from '@/types';

export function useHasPick(url: string | undefined): UseHasLinkResponseType {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<PickInfoType | undefined>(undefined);

  useEffect(() => {
    const fetchHasPick = async (url: string) => {
      try {
        const pickData = await getPickByUrl(url);
        if (pickData.exist) {
          setData(pickData.pick);
        }
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };

    if (url && url !== '') {
      fetchHasPick(url);
    }
  }, [url]);

  if (isLoading) {
    return { isLoading: true, hasLink: false };
  }

  if (data) {
    return { isLoading: false, hasLink: true, data };
  }

  return { isLoading: false, hasLink: false };
}

type UseHasLinkResponseType =
  | { isLoading: boolean; hasLink: true; data: PickInfoType }
  | { isLoading: boolean; hasLink: false; data?: undefined };
