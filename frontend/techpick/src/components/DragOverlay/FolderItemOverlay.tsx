import { FolderOpen as FolderOpenIcon } from 'lucide-react';
import {
  FolderIconStyle,
  folderTextStyle,
} from '../FolderTree/folderLinkItem.css';
import { folderItemOverlay } from './folderItemOverlay.css';

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
