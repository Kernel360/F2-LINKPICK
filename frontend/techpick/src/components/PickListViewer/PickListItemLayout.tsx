'use client';
import type { PickViewItemListLayoutComponentProps } from './PickListViewer';
import { pickListItemLayoutStyle } from './pickListItemLayout.css';

export function PickListItemLayout({
  children,
}: PickViewItemListLayoutComponentProps) {
  return <div className={pickListItemLayoutStyle}>{children}</div>;
}
