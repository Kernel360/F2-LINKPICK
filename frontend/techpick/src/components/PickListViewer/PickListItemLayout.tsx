'use client';
import { pickListItemLayoutStyle } from './pickListItemLayout.css';
import { PickViewItemListLayoutComponentProps } from './PickListViewer';

export function PickListItemLayout({
  children,
}: PickViewItemListLayoutComponentProps) {
  return <div className={pickListItemLayoutStyle}>{children}</div>;
}
