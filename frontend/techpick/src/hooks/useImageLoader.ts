import { useLayoutEffect, useState } from 'react';

type ImageStatus = 'loading' | 'loaded' | 'error';

/**
 *
 * @param imageUrl
 * @description imageUrl의 상태를 나타냅니다. 'loading' | 'loaded' | 'error'
 * @returns imageStatus
 */

export function useImageLoader(imageUrl: string | undefined) {
  const [imageStatus, setImageStatus] = useState<ImageStatus>('loading');

  useLayoutEffect(() => {
    if (!imageUrl) {
      setImageStatus('error');
      return;
    }

    const img = new window.Image();
    img.onload = () => setImageStatus('loaded');
    img.onerror = () => setImageStatus('error');
    img.src = imageUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  return { imageStatus };
}
