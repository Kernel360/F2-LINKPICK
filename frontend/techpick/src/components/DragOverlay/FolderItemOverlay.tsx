import { FolderOpen as FolderOpenIcon } from 'lucide-react';
import {
  folderItemOverlay,
  FolderIconStyle,
  folderTextStyle,
} from './folderItemOverlay.css';

export function FolderItemOverlay({ name }: FolderItemOverlayProps) {
  return (
    <div className={folderItemOverlay}>
      <FolderOpenIcon className={FolderIconStyle} />
      <p className={folderTextStyle}>{name}</p>
    </div>
  );
}

interface FolderItemOverlayProps {
  name: string;
}
