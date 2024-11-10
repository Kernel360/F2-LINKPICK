'use client';

import { PickViewItemListLayoutComponentProps } from '.';
import { pickCardGridLayoutStyle } from './pickCardGridLayout.css';

export function PickCardListLayout({
  children,
}: PickViewItemListLayoutComponentProps) {
  return <div className={pickCardGridLayoutStyle}>{children}</div>;
}
