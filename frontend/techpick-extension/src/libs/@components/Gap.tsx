import type { PropsWithChildren } from 'react';
import {
  type GapSize,
  horizontalGapVariants,
  verticalGapVariants,
} from './Gap.css';

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
