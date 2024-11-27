'use client';

import { usePathname } from 'next/navigation';
import { useTreeStore } from '@/stores';
import { CurrentFolderNameSection } from './CurrentFolderNameSection';
import { CurrentPathIndicator } from './CurrentPathIndicator';
import { Gap } from '../Gap';

export function FolderContentHeader() {
  const pathname = usePathname();
  const getFolderInfoByPathname = useTreeStore(
    (state) => state.getFolderInfoByPathname
  );
  const folderInfo = getFolderInfoByPathname(pathname);

  return (
    <div>
      <CurrentFolderNameSection folderInfo={folderInfo} />
      {folderInfo?.folderType === 'GENERAL' && (
        <Gap verticalSize="gap8">
          <CurrentPathIndicator folderInfo={folderInfo} />
        </Gap>
      )}
    </div>
  );
}
