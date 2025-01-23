'use client';
import { useFetchBasicFolders } from '@/queries/useFetchBasicFolders';
import { useFetchFolders } from '@/queries/useFetchFolders';
import type { FolderIdType } from '@/types/FolderIdType';
import { getBasicFolderInfoByFolderId } from '@/utils/getBasicFolderInfoByFolderId';
import { getFolderInfoByFolderId } from '@/utils/getFolderInfoByFolderId';
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

export function FolderContentHeader({ folderId }: FolderContentHeaderProps) {
  const { data: basicFolderRecord } = useFetchBasicFolders();
  const { data: folderRecord } = useFetchFolders();
  const folderInfo =
    getFolderInfoByFolderId({
      folderId,
      folderRecord,
    }) ?? getBasicFolderInfoByFolderId({ folderId, basicFolderRecord });

  return (
    <div className={folderContentHeaderLayoutStyle}>
      <Gap verticalSize="gap16" horizontalSize="gap24">
        <div className={folderContentHeaderStyle}>
          <div className={folderDescriptionStyle}>
            <CurrentFolderNameSection folderInfo={folderInfo} />
            <Gap verticalSize="gap4">
              <CurrentPathIndicator folderInfo={folderInfo} />
            </Gap>
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

interface FolderContentHeaderProps {
  folderId: FolderIdType;
}
