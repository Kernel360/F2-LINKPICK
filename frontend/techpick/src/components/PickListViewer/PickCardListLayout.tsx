'use client';

import { pickCardGridLayoutStyle } from './pickCardGridLayout.css';
import { PickViewItemListLayoutComponentProps } from './PickListViewer';

export function PickCardListLayout({
  children,
}: PickViewItemListLayoutComponentProps) {
  return <div className={pickCardGridLayoutStyle}>{children}</div>;
}
