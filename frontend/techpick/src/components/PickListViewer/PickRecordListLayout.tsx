'use client';
import { PickViewItemListLayoutComponentProps } from './PickListViewer';
import { pickRecordListLayoutStyle } from './pickRecordListLayout.css';

export function PickRecordListLayout({
  children,
}: PickViewItemListLayoutComponentProps) {
  return <div className={pickRecordListLayoutStyle}>{children}</div>;
}
