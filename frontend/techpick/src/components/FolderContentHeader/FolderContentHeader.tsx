'use client';

import { usePathname } from 'next/navigation';
import { useTreeStore } from '@/stores';
import { CurrentFolderNameSection } from './CurrentFolderNameSection';
import { CurrentPathIndicator } from './CurrentPathIndicator';
import { Gap } from '../Gap';
import {
  createPickPopoverButtonLayoutStyle,
  folderContentHeaderLayoutStyle,
  folderContentHeaderStyle,
  folderDescriptionStyle,
} from './folderContentHeader.css';
import { CreatePickPopoverButton } from '../CreatePickPopover/CreatePickPopoverButton';

export function FolderContentHeader() {
  const pathname = usePathname();
  const { getFolderInfoByPathname } = useTreeStore();
  const folderInfo = getFolderInfoByPathname(pathname);

  return (
    <div className={folderContentHeaderLayoutStyle}>
      <Gap verticalSize="gap16" horizontalSize="gap24">
        <div className={folderContentHeaderStyle}>
          <div className={folderDescriptionStyle}>
            <CurrentFolderNameSection folderInfo={folderInfo} />
            {folderInfo?.folderType === 'GENERAL' && (
              <Gap verticalSize="gap4">
                <CurrentPathIndicator folderInfo={folderInfo} />
              </Gap>
            )}
          </div>

          <div className={createPickPopoverButtonLayoutStyle}>
            {folderInfo?.folderType !== 'RECYCLE_BIN' && (
              <CreatePickPopoverButton />
            )}
          </div>
        </div>
      </Gap>
    </div>
  );
}
