import { PropsWithChildren } from 'react';
import { pickContentLayoutStyle } from './pickContentLayout.css';

/**
 *
 * @description PickList를 감싸는 컴포넌트입니다.
 */
export function PickContentLayout({ children }: PropsWithChildren) {
  return <div className={pickContentLayoutStyle}>{children}</div>;
}
