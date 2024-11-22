import type { PropsWithChildren } from 'react';
import { Gap } from '../Gap';
import { pickTagColumnLayoutStyle } from './pickTagColumnLayout.css';

export function PickTagColumnLayout({ children }: PropsWithChildren) {
  return (
    <div className={pickTagColumnLayoutStyle}>
      <Gap horizontalSize="gap8">{children}</Gap>
    </div>
  );
}
