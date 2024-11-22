'use client';

import { PropsWithChildren } from 'react';
import { verticalGapVariants, horizontalGapVariants, GapSize } from './Gap.css';

export function Gap({
  verticalSize = 'gap0',
  horizontalSize = 'gap0',
  children,
}: PropsWithChildren<GapProps>) {
  return (
    <div
      className={`${verticalGapVariants[verticalSize]} ${horizontalGapVariants[horizontalSize]}`}
    >
      {children}
    </div>
  );
}

interface GapProps {
  verticalSize?: GapSize;
  horizontalSize?: GapSize;
}
