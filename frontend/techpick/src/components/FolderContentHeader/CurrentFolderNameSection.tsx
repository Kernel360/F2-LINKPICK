'use client';

import { FolderOpenIcon } from 'lucide-react';
import {
  currentFolderNameSectionStyle,
  folderNameStyle,
  folderOpenIconStyle,
} from './currentFolderNameSection.css';
import { FolderType } from '@/types';

export function CurrentFolderNameSection({
  folderInfo,
}: CurrentFolderNameSectionProps) {
  return (
    <div className={currentFolderNameSectionStyle}>
      <FolderOpenIcon size={24} className={folderOpenIconStyle} />
      <h1 className={folderNameStyle}>
        {folderInfo ? folderInfo.name : 'loading...'}
      </h1>
    </div>
  );
}

interface CurrentFolderNameSectionProps {
  folderInfo: FolderType | null;
}
