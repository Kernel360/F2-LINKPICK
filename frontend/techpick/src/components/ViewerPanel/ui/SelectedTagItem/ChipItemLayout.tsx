import { CSSProperties, ReactNode } from 'react';
import { chipItemStyle } from './ChipItemLayout.css';

export interface ChipLayoutProps {
  children: ReactNode;
  style: CSSProperties;
}

export function ChipItemLayout({ children, style }: ChipLayoutProps) {
  return (
    <span className={chipItemStyle} style={style}>
      {children}
    </span>
  );
}
