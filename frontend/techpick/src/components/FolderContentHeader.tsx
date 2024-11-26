'use client';

import { Suspense } from 'react';
import { CurrentPathIndicator } from './FolderPathIndicator/CurrentPathIndicator';

/**
 *
 * @description 해당 폴더의 경로를 출력해줍니다.
 *
 * 미분류 휴지통, 내 컬렉션에는 필요하지 않습니다.
 */
export function FolderContentHeader() {
  return (
    <div>
      <Suspense>
        <CurrentPathIndicator />
      </Suspense>
    </div>
  );
}
