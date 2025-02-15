'use client';

import { ROUTES } from '@/constants/route';
import type { FolderType } from '@/types/FolderType';
import { FolderOpenIcon } from 'lucide-react';
import Link from 'next/link';
import {
  currentFolderNameSectionStyle,
  folderNameStyle,
  folderOpenIconStyle,
  folderSharedInfoLinkStyle,
} from './currentFolderNameSection.css';

export function CurrentFolderNameSection({
  folderInfo,
}: CurrentFolderNameSectionProps) {
  return (
    <div className={currentFolderNameSectionStyle}>
      <FolderOpenIcon size={24} className={folderOpenIconStyle} />
      <h1 className={folderNameStyle}>
        {folderInfo ? folderInfo.name : 'loading...'}
      </h1>

      {folderInfo?.folderAccessToken ? (
        <Link
          href={ROUTES.SHARE(folderInfo.folderAccessToken)}
          className={folderSharedInfoLinkStyle}
          target="_blank"
        >
          (공유 중)
        </Link>
      ) : null}
    </div>
  );
}

interface CurrentFolderNameSectionProps {
  folderInfo: FolderType | null | undefined;
}
