'use client';

import { usePickStore } from '@/stores/pickStore/pickStore';
import { Folder } from 'lucide-react';
import Link from 'next/link';
import type { ElementType, MouseEvent } from 'react';
import {
  FolderIconStyle,
  dragOverItemStyle,
  folderInfoItemStyle,
  folderTextStyle,
  selectedDragItemStyle,
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
    (state) => state.isMovingDestinationFolderId,
  );

  return (
    <Link href={isMovingDestinationFolderId === folderId ? '#' : href}>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className={`${folderInfoItemStyle} ${isSelected ? selectedDragItemStyle : ''} ${isHovered ? dragOverItemStyle : ''}`}
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
