'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { getItemFromLocalStorage, setItemToLocalStorage } from '@/utils';

type SetValue<T> = Dispatch<SetStateAction<T>>;

/**
 * @description useLocalStorage의 storedValue가 제대로 로드됐는지 확인하기 위해선
 * isStoredValueLoad가 true인지 획인해야합니다.
 *
 * 이렇게 한 이유는 nextjs의 hydration failed error때문입니다.
 * @returns
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T | undefined>(undefined);
  const [isStoredValueLoad, setIsStoredValueLoad] = useState(false);

  useEffect(() => {
    try {
      const item = getItemFromLocalStorage<T>(key);
      if (item !== null) {
        setStoredValue(item);
      } else {
        setStoredValue(initialValue);
      }
    } catch {
      setStoredValue(initialValue);
    } finally {
      setIsStoredValueLoad(true);
    }
  }, [key, initialValue]);

  const setValue: SetValue<T> = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue as T) : value;
      setStoredValue(valueToStore);
      setItemToLocalStorage(key, valueToStore);
    } catch {
      // 에러 처리
    }
  };

  if (!isStoredValueLoad) {
    return { isStoredValueLoad, setValue, storedValue: null };
  }

  return {
    storedValue,
    setValue,
    isStoredValueLoad,
  };
}
