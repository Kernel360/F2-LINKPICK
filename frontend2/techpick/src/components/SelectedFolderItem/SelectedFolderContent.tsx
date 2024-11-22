import { selectedFolderContentStyle } from '@/components/SelectedFolderItem/SelectedFolderContent.css';

export function SelectedFolderContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <span className={selectedFolderContentStyle}>{children}</span>;
}
