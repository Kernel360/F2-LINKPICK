import { ChipContentStyle } from './ChipItemContent.css';

export interface ChipItemContentProps {
  children: React.ReactNode;
}

export function ChipItemContent({ children }: ChipItemContentProps) {
  return <span className={ChipContentStyle}>{children}</span>;
}
