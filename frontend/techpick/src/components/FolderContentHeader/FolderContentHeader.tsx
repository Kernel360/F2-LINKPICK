'use client';

import { usePathname } from 'next/navigation';
import { useTreeStore } from '@/stores';
import { CurrentFolderNameSection } from './CurrentFolderNameSection';
import { CurrentPathIndicator } from './CurrentPathIndicator';
import { Gap } from '../Gap';
import { folderContentHeaderStyle } from './folderContentHeader.css';

export function FolderContentHeader() {
  const pathname = usePathname();
  const { getFolderInfoByPathname } = useTreeStore();
  const folderInfo = getFolderInfoByPathname(pathname);

  return (
    <div className={folderContentHeaderStyle}>
      <CurrentFolderNameSection folderInfo={folderInfo} />
      {folderInfo?.folderType === 'GENERAL' && (
        <Gap verticalSize="gap8">
          <CurrentPathIndicator folderInfo={folderInfo} />
        </Gap>
      )}
    </div>
  );
}
