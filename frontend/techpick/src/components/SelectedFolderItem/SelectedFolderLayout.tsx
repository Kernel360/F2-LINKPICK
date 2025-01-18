import { selectedFolderLayoutStyle } from '@/components/SelectedFolderItem/SelectedFolderLayout.css';
import type { CSSProperties, ReactNode } from 'react';

export function SelectedFolderLayout({
  style,
  children,
}: {
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <span className={selectedFolderLayoutStyle} style={style}>
      {children}
    </span>
  );
}
