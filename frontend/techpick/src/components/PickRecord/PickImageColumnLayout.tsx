import type { PropsWithChildren } from 'react';
import { Gap } from '../Gap';
import { pickImageColumnLayoutStyle } from './pickImageColumnLayout.css';

export function PickImageColumnLayout({ children }: PropsWithChildren) {
  return (
    <div className={pickImageColumnLayoutStyle}>
      <Gap horizontalSize="gap8">{children}</Gap>
    </div>
  );
}
