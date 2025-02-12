'use client';

import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Spinner } from './Spinner';
import { loadingContainer } from './pullToRefreshContainer.css';

export const DEFAULT_MAXIMUM_PULL_LENGTH = 100;
export const DEFAULT_REFRESH_THRESHOLD = 80;

export function PullToRefreshContainer({
  onRefresh = () => {},
  isDisabled = false,
  maximumPullLength = DEFAULT_MAXIMUM_PULL_LENGTH,
  refreshThreshold = DEFAULT_REFRESH_THRESHOLD,
  children,
}: PropsWithChildren<PullToRefreshContainerProps>) {
  const [touchStartY, setTouchStartY] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isThresholdReached, setIsThresholdReached] = useState(false);

  const pullProgress = pullDistance / refreshThreshold;

  const resetPullState = useCallback(() => {
    setTouchStartY(0);
    setPullDistance(0);
    setIsThresholdReached(false);
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
      resetPullState();
    }
  }, [onRefresh, resetPullState]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (isDisabled || isRefreshing) return;
      setTouchStartY(e.targetTouches[0].screenY);
    },
    [isDisabled, isRefreshing],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (isDisabled || isRefreshing) return;

      const touchY = e.targetTouches[0].screenY;
      const distance = Math.min(
        maximumPullLength,
        Math.max(0, touchY - touchStartY),
      );

      setPullDistance(distance);
      setIsThresholdReached(distance >= refreshThreshold);
    },
    [
      isDisabled,
      isRefreshing,
      touchStartY,
      maximumPullLength,
      refreshThreshold,
    ],
  );

  const handleTouchEnd = useCallback(() => {
    if (isDisabled || isRefreshing) {
      resetPullState();
      return;
    }

    if (pullDistance >= refreshThreshold) {
      handleRefresh();
    } else {
      resetPullState();
    }
  }, [
    isDisabled,
    isRefreshing,
    pullDistance,
    refreshThreshold,
    handleRefresh,
    resetPullState,
  ]);

  useEffect(() => {
    if (isDisabled) {
      resetPullState();
    }
  }, [isDisabled, resetPullState]);

  return (
    <div>
      <div
        onTouchStart={(e) => {
          e.stopPropagation();
          handleTouchStart(e);
        }}
        onTouchMove={(e) => {
          e.stopPropagation();
          handleTouchMove(e);
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          handleTouchEnd();
        }}
      >
        <div
          className={loadingContainer}
          style={{ height: `${Math.min(pullDistance, maximumPullLength)}px` }}
        >
          <Spinner
            scale={isRefreshing ? 1 : Math.min(pullProgress, 1)}
            progress={pullProgress}
            startAnimation={isThresholdReached}
          />
        </div>
        {children}
      </div>
    </div>
  );
}

interface PullToRefreshContainerProps {
  onRefresh?: () => void | Promise<void>;
  isDisabled?: boolean;
  maximumPullLength?: number;
  refreshThreshold?: number;
}
