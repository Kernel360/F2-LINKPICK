import { FolderOpen as FolderOpenIcon } from 'lucide-react';
import { NavigationItem } from '../SideNavigationBar/NavigationItem';
import { folderItemOverlay } from './folderItemOverlay.css';

export function FolderItemOverlay({ name }: FolderItemOverlayProps) {
  return (
    <NavigationItem
      href="#"
      text={name}
      icon={FolderOpenIcon}
      isActive={false}
      className={folderItemOverlay}
    />
  );
}

interface FolderItemOverlayProps {
  name: string;
}
