'use client';

import { usePathname } from 'next/navigation';
import { useTreeStore } from '@/stores';
import { CurrentFolderNameSection } from './CurrentFolderNameSection';
import { CurrentPathIndicator } from './CurrentPathIndicator';
import { folderContentHeaderStyle } from './folderContentHeader.css';

export function FolderContentHeader() {
  const pathname = usePathname();
  const getFolderInfoByPathname = useTreeStore(
    (state) => state.getFolderInfoByPathname
  );
  const folderInfo = getFolderInfoByPathname(pathname);

  return (
    <div className={folderContentHeaderStyle}>
      <CurrentFolderNameSection folderInfo={folderInfo} />
      {folderInfo?.folderType === 'GENERAL' && (
        <CurrentPathIndicator folderInfo={folderInfo} />
      )}
    </div>
  );
}
