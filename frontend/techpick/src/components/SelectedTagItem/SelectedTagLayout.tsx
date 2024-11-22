import { CSSProperties, ReactNode } from 'react';
import { selectedTagLayoutStyle } from './SelectedTagLayout.css';

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
