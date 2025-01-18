import { SelectedFolderContent } from '@/components/SelectedFolderItem/SelectedFolderContent';
import { SelectedFolderLayout } from '@/components/SelectedFolderItem/SelectedFolderLayout';
import type { FolderType } from '@/types/FolderType';

export function SelectedFolderItem({ folder, children }: FolderItemProps) {
  return (
    <SelectedFolderLayout>
      <SelectedFolderContent>{folder.name}</SelectedFolderContent>
      {children}
    </SelectedFolderLayout>
  );
}

interface FolderItemProps {
  folder: FolderType;
  children?: React.ReactNode;
}
