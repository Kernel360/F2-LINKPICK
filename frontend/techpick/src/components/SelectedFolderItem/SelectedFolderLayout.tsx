import { CSSProperties, ReactNode } from 'react';
import { selectedFolderLayoutStyle } from '@/components/SelectedFolderItem/SelectedFolderLayout.css';

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
