'use client';

import type { ElementType, MouseEvent } from 'react';
import Link from 'next/link';
import { Folder } from 'lucide-react';
import { usePickStore } from '@/stores';
import {
  folderInfoItemStyle,
  selectedDragItemStyle,
  FolderIconStyle,
  dragOverItemStyle,
  folderTextStyle,
} from './folderLinkItem.css';

export function FolderLinkItem({
  name,
  href,
  isSelected,
  isHovered = false,
  folderId,
  onClick = () => {},
  icon: IconComponent = Folder,
}: FolderListItemProps) {
  const isMovingDestinationFolderId = usePickStore(
    (state) => state.isMovingDestinationFolderId
  );

  return (
    <Link href={isMovingDestinationFolderId === folderId ? '#' : href}>
      <div
        className={`${folderInfoItemStyle}  ${isSelected ? selectedDragItemStyle : ''} ${isHovered ? dragOverItemStyle : ''}`}
        onClick={onClick}
      >
        <IconComponent className={FolderIconStyle} />
        <p className={folderTextStyle}>{name}</p>
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
  folderId: number;
  icon?: ElementType;
}
