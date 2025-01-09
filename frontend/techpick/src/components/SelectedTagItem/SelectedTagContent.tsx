import { selectedTagContentStyle } from './SelectedTagContent.css';

export function SelectedTagContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <span className={selectedTagContentStyle}>{children}</span>;
}
