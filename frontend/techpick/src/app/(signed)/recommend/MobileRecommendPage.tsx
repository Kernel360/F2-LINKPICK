'use client';

import { PullToRefreshContainer } from '@/components/PullToRefreshContainer';

export function MobileRecommendPage() {
  return (
    <PullToRefreshContainer onRefresh={async () => {}}>
      <div>
        <div style={{ background: 'silver', height: '100vh' }}>
          recommend dasdasdas
        </div>
      </div>
    </PullToRefreshContainer>
  );
}
