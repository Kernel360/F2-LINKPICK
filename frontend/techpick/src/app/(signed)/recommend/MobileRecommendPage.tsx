'use client';

import { usePullToRefresh } from '@/hooks/usePullToRefresh';

export function MobileRecommendPage() {
  const { isRefreshing, pullPosition, ref } = usePullToRefresh({
    onRefresh: () => {},
  });

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          height: `${pullPosition}px`,
          display: pullPosition === 0 || !isRefreshing ? 'none' : 'block',
        }}
      >
        loadingpage
      </div>
      <div style={{ background: 'silver', height: '100%' }} ref={ref}>
        recommend dasdasdas
      </div>
    </div>
  );
}
