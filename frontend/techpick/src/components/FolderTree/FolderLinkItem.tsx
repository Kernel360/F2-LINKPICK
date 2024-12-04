import type { ElementType, MouseEvent } from 'react';
import Link from 'next/link';
import { Folder } from 'lucide-react';
import {
  folderInfoItemStyle,
  selectedDragItemStyle,
  FolderIconStyle,
  dragOverItemStyle,
  folderTextStyle,
  sharedTextStyle,
} from './folderLinkItem.css';

export function FolderLinkItem({
  name,
  href,
  isSelected,
  isHovered = false,
  isShared,
  onClick = () => {},
  icon: IconComponent = Folder,
}: FolderListItemProps) {
  return (
    <Link href={href}>
      <div
        className={`${folderInfoItemStyle}  ${isSelected ? selectedDragItemStyle : ''} ${isHovered ? dragOverItemStyle : ''}`}
        onClick={onClick}
      >
        <IconComponent className={FolderIconStyle} />
        <p className={folderTextStyle}>{name}</p>
        {isShared && <p className={sharedTextStyle}>공개중</p>}
      </div>
    </Link>
  );
}

interface FolderListItemProps {
  name: string;
  href: string;
  isSelected?: boolean;
  isHovered?: boolean;
  isShared?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  icon?: ElementType;
}
