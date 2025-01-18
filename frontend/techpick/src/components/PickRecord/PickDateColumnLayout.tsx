import type { PropsWithChildren } from 'react';
import { Gap } from '../Gap';
import { pickDateColumnLayoutStyle } from './pickDateColumnLayout.css';

export function PickDateColumnLayout({ children }: PropsWithChildren) {
  return (
    <div className={pickDateColumnLayoutStyle}>
      <Gap horizontalSize="gap8">{children}</Gap>
    </div>
  );
}
