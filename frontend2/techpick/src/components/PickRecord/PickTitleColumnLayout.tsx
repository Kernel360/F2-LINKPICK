import type { PropsWithChildren } from 'react';
import { Gap } from '../Gap';
import { pickTitleColumnLayoutStyle } from './pickTitleColumnLayout.css';

export function PickTitleColumnLayout({ children }: PropsWithChildren) {
  return (
    <div className={pickTitleColumnLayoutStyle}>
      <Gap horizontalSize="gap8">{children}</Gap>
    </div>
  );
}
