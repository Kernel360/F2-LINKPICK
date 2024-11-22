import type { PropsWithChildren } from 'react';
import { pickDateColumnLayoutStyle } from './pickDateColumnLayout.css';
import { Gap } from '../Gap';

export function PickDateColumnLayout({ children }: PropsWithChildren) {
  return (
    <div className={pickDateColumnLayoutStyle}>
      <Gap horizontalSize="gap8">{children}</Gap>
    </div>
  );
}
