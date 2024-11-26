'use client';

import { FolderOpenIcon } from 'lucide-react';
import {
  currentFolderNameSectionStyle,
  folderNameStyle,
} from './currentFolderNameSection.css';
import { FolderType } from '@/types';

export function CurrentFolderNameSection({
  folderInfo,
}: CurrentFolderNameSectionProps) {
  return (
    <div className={currentFolderNameSectionStyle}>
      <FolderOpenIcon size={28} />
      <h1 className={folderNameStyle}>
        {folderInfo ? folderInfo.name : 'loading...'}
      </h1>
    </div>
  );
}

interface CurrentFolderNameSectionProps {
  folderInfo: FolderType | null;
}
