import type { ElementType, MouseEvent } from 'react';
import Link from 'next/link';
import { Folder } from 'lucide-react';
import {
  folderInfoItemStyle,
  selectedDragItemStyle,
  FolderIconStyle,
  dragOverItemStyle,
} from './folderLinkItem.css';

export function FolderLinkItem({
  name,
  href,
  isSelected,
  isHovered = false,
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
        {name}
      </div>
    </Link>
  );
}

interface FolderListItemProps {
  name: string;
  href: string;
  isSelected?: boolean;
  isHovered?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  icon?: ElementType;
}
