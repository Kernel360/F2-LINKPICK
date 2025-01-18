'use client';

import type { PickViewItemListLayoutComponentProps } from './PickListViewer';
import { pickCardGridLayoutStyle } from './pickCardGridLayout.css';

export function PickCardListLayout({
  children,
}: PickViewItemListLayoutComponentProps) {
  return <div className={pickCardGridLayoutStyle}>{children}</div>;
}
