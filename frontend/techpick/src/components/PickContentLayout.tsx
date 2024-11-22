import { PropsWithChildren } from 'react';
import { pickContentLayoutStyle } from './pickContentLayout.css';

export function PickContentLayout({ children }: PropsWithChildren) {
  return <div className={pickContentLayoutStyle}>{children}</div>;
}
