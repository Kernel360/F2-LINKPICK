import { ChipItemContent } from './ChipItemContent';
import { ChipItemLayout } from './ChipItemLayout';

interface ChipItemProps {
  children?: React.ReactNode;
  label: string;
  backgroundColor?: string;
}

export function ChipItem({ children, label, backgroundColor }: ChipItemProps) {
  return (
    <ChipItemLayout style={{ backgroundColor }}>
      {children}
      <ChipItemContent>{label}</ChipItemContent>
    </ChipItemLayout>
  );
}
