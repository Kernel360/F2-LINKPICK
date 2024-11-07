'use client';

import { FolderInputIcon, Trash2Icon } from 'lucide-react';
import { ROUTES } from '@/constants';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { FolderLinkItem } from './FolderLinkItem';
import { folderTreeHeaderLayout } from './folderTreeHeader.css';

export function FolderTreeHeader() {
  const { basicFolderMap, focusFolderId } = useTreeStore();

  const isUnclassifiedSelected = !!(
    basicFolderMap && focusFolderId === basicFolderMap['UNCLASSIFIED'].id
  );

  const isRecycleBinSelected = !!(
    basicFolderMap && focusFolderId === basicFolderMap['RECYCLE_BIN'].id
  );

  return (
    <div className={folderTreeHeaderLayout}>
      {basicFolderMap && (
        <>
          <FolderLinkItem
            href={ROUTES.FOLDERS_UNCLASSIFIED}
            name="미분류"
            icon={FolderInputIcon}
            isSelected={isUnclassifiedSelected}
          />

          <FolderLinkItem
            href={ROUTES.FOLDERS_RECYCLE_BIN}
            name="휴지통"
            icon={Trash2Icon}
            isSelected={isRecycleBinSelected}
          />
        </>
      )}
      <hr />
    </div>
  );
}
