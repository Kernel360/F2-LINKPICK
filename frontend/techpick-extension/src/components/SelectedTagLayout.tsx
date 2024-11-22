import { selectedTagLayoutStyle } from './SelectedTagLayout.css';
import { CSSProperties, ReactNode } from 'react';

export function SelectedTagLayout({
  style,
  children,
}: {
  style: CSSProperties;
  children: ReactNode;
}) {
  return (
    <span className={selectedTagLayoutStyle} style={style}>
      {children}
    </span>
  );
}
