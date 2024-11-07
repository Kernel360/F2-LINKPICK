import type { ElementType, MouseEvent } from 'react';
import Link from 'next/link';
import { Folder } from 'lucide-react';
import {
  folderInfoItemStyle,
  selectedDragItemStyle,
  FolderIconStyle,
} from './folderLinkItem.css';
import { Text } from '../Text';

export function FolderLinkItem({
  name,
  href,
  isSelected,
  onClick = () => {},
  icon: IconComponent = Folder,
}: FolderListItemProps) {
  return (
    <Link href={href}>
      <div
        className={`${folderInfoItemStyle}  ${isSelected ? selectedDragItemStyle : ''}`}
        onClick={onClick}
      >
        <IconComponent className={FolderIconStyle} />
        <Text>{name}</Text>
      </div>
    </Link>
  );
}

interface FolderListItemProps {
  name: string;
  href: string;
  isSelected?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  icon?: ElementType;
}
