'use client';

import { NON_EXIST_FOLDER_ID } from '@/constants/nonExistFolderId';
import { ROUTES } from '@/constants/route';
import { useFetchBasicFolders } from '@/queries/useFetchBasicFolders';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { ArchiveIcon, Trash2Icon } from 'lucide-react';
import { FolderLinkItem } from './FolderLinkItem';
import { PickToFolderDropZone } from './PickToFolderDropZone';
import {
  folderTreeHeaderLayout,
  folderTreeHeaderTitleLayout,
} from './folderTreeHeader.css';

export function FolderTreeHeader() {
  const { focusFolderId, hoverFolderId } = useTreeStore();
  const { data: basicFolderRecord } = useFetchBasicFolders();

  const isUnclassifiedSelected = !!(
    basicFolderRecord && focusFolderId === basicFolderRecord.UNCLASSIFIED.id
  );

  const isRecycleBinSelected = !!(
    basicFolderRecord && focusFolderId === basicFolderRecord.RECYCLE_BIN.id
  );

  const isRootSelected = !!(
    basicFolderRecord && focusFolderId === basicFolderRecord.ROOT.id
  );

  const isUnclassifiedFolderHover =
    (basicFolderRecord &&
      basicFolderRecord.UNCLASSIFIED.id === hoverFolderId) ??
    false;

  const isRecycleBinFolderHover =
    (basicFolderRecord && basicFolderRecord.RECYCLE_BIN.id === hoverFolderId) ??
    false;

  return (
    <div className={folderTreeHeaderLayout}>
      {basicFolderRecord && (
        <div>
          <div className={folderTreeHeaderTitleLayout}>
            <h1>정리함</h1>
          </div>

          <FolderLinkItem
            href={ROUTES.RECOMMEND}
            name="추천"
            icon={ArchiveIcon}
            folderId={NON_EXIST_FOLDER_ID}
            isSelected={isRootSelected}
          />
          <PickToFolderDropZone folderId={basicFolderRecord.UNCLASSIFIED.id}>
            <FolderLinkItem
              href={ROUTES.FOLDER_DETAIL(basicFolderRecord.UNCLASSIFIED.id)}
              name="미분류"
              icon={ArchiveIcon}
              isSelected={isUnclassifiedSelected}
              isHovered={isUnclassifiedFolderHover}
              folderId={basicFolderRecord.UNCLASSIFIED.id}
            />
          </PickToFolderDropZone>
          <PickToFolderDropZone folderId={basicFolderRecord.RECYCLE_BIN.id}>
            <FolderLinkItem
              href={ROUTES.FOLDER_DETAIL(basicFolderRecord.RECYCLE_BIN.id)}
              name="휴지통"
              icon={Trash2Icon}
              isHovered={isRecycleBinFolderHover}
              isSelected={isRecycleBinSelected}
              folderId={basicFolderRecord.RECYCLE_BIN.id}
            />
          </PickToFolderDropZone>
        </div>
      )}
    </div>
  );
}
