'use client';

import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { usePathname } from 'next/navigation';
import { ChromeExtensionLinkButton } from '../ChromeExtensionLinkButton/ChromeExtensionLinkButton';
import { Gap } from '../Gap';
import { CurrentFolderNameSection } from './CurrentFolderNameSection';
import { CurrentPathIndicator } from './CurrentPathIndicator';
import {
  createPickPopoverButtonLayoutStyle,
  folderContentHeaderLayoutStyle,
  folderContentHeaderStyle,
  folderDescriptionStyle,
} from './folderContentHeader.css';

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
              <ChromeExtensionLinkButton />
            )}
          </div>
        </div>
      </Gap>
    </div>
  );
}
