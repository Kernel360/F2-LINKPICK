import { useEffect, useState } from 'react';
import { getPickByUrl } from '@/apis';
import { GetPickByUrlResponseType } from '@/types';

export function useHasPick(url: string | undefined): UseHasLinkResponseType {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<GetPickByUrlResponseType>();

  useEffect(() => {
    const fetchHasPick = async (url: string) => {
      try {
        const pickData = await getPickByUrl(url);
        setData(pickData);
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
  | { isLoading: boolean; hasLink: true; data: GetPickByUrlResponseType }
  | { isLoading: boolean; hasLink: false; data?: undefined };
