import { useCallback, useEffect, useRef, useState } from 'react';

export const DEFAULT_MAXIMUM_PULL_LENGTH = 240;
export const DEFAULT_REFRESH_THRESHOLD = 60;

export type UsePullToRefreshParams = {
  onRefresh: () => void | Promise<void>;
  maximumPullLength?: number;
  refreshThreshold?: number;
  isDisabled?: boolean;
};

export type UsePullToRefreshReturn = {
  isRefreshing: boolean;
  pullPosition: number;
  ref: (node: HTMLElement | null) => void;
};

export const usePullToRefresh = ({
  onRefresh,
  maximumPullLength = DEFAULT_MAXIMUM_PULL_LENGTH,
  refreshThreshold = DEFAULT_REFRESH_THRESHOLD,
  isDisabled = false,
}: UsePullToRefreshParams): UsePullToRefreshReturn => {
  const [pullStartPosition, setPullStartPosition] = useState(0);
  const [pullPosition, setPullPosition] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);

  const callbackRef = useCallback((node: HTMLElement | null) => {
    targetRef.current = node;
  }, []);

  const checkIfAtTop = useCallback(() => {
    return () => targetRef.current?.scrollTop === 0;
  }, []);

  const onPullStart = useCallback(
    (e: TouchEvent) => {
      if (isDisabled || !checkIfAtTop()) {
        return;
      }

      const touch = e.targetTouches[0];
      if (touch) setPullStartPosition(touch.screenY);
    },
    [isDisabled, checkIfAtTop],
  );

  const onPulling = useCallback(
    (e: TouchEvent) => {
      if (isDisabled || !checkIfAtTop() || pullStartPosition === 0) {
        return;
      }

      const touch = e.targetTouches[0];
      if (!touch) return;

      const currentPullLength = Math.min(
        maximumPullLength,
        Math.max(0, touch.screenY - pullStartPosition),
      );
      setPullPosition(currentPullLength);

      if (targetRef.current) {
        requestAnimationFrame(() => {
          if (targetRef.current) {
            targetRef.current.style.transform = `translateY(${currentPullLength}px)`;
          }
        });
      }
    },
    [isDisabled, maximumPullLength, pullStartPosition, checkIfAtTop],
  );

  const onEndPull = useCallback(async () => {
    if (isDisabled) return;

    setPullStartPosition(0);
    setPullPosition(0);

    if (targetRef.current) {
      requestAnimationFrame(() => {
        if (targetRef.current) {
          targetRef.current.style.transform = 'translateY(0)';
        }
      });
    }

    if (pullPosition < refreshThreshold) {
      return;
    }

    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  }, [isDisabled, onRefresh, pullPosition, refreshThreshold]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isDisabled) {
      return;
    }

    const target = targetRef.current;
    if (!target) {
      return;
    }

    target.addEventListener('touchstart', onPullStart, { passive: true });
    target.addEventListener('touchmove', onPulling, { passive: true });
    target.addEventListener('touchend', onEndPull, { passive: true });

    return () => {
      target.removeEventListener('touchstart', onPullStart);
      target.removeEventListener('touchmove', onPulling);
      target.removeEventListener('touchend', onEndPull);
    };
  }, [isDisabled, onPullStart, onPulling, onEndPull]);

  return { isRefreshing, pullPosition, ref: callbackRef };
};
