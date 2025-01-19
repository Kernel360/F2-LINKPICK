'use client';

import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import type { FolderType } from '@/types/FolderType';
import { getFolderLinkByType } from '@/utils/getFolderLinkByType';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './Breadcrumb';
import {
  breadcrumbItemLayout,
  breadcrumbItemStyle,
  breadcrumbLinkStyle,
} from './currentPathIndicator.css';

export function CurrentPathIndicator({
  folderInfo,
}: CurrentPathIndicatorProps) {
  const getAncestorFolderListFromLeaf = useTreeStore(
    (state) => state.getAncestorFolderListFromLeaf,
  );
  const ancestorFolderList = getAncestorFolderListFromLeaf(folderInfo);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {ancestorFolderList.map((folderInfo, index) => {
            return (
              <div key={folderInfo.id} className={breadcrumbItemLayout}>
                {index !== 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem className={breadcrumbItemStyle}>
                  {folderInfo.folderType === 'ROOT' ? (
                    '내 폴더'
                  ) : (
                    <BreadcrumbLink className={breadcrumbLinkStyle} asChild>
                      <Link href={getFolderLinkByType(folderInfo)}>
                        {folderInfo.folderType === 'RECYCLE_BIN'
                          ? '휴지통'
                          : folderInfo.folderType === 'UNCLASSIFIED'
                            ? '미분류'
                            : folderInfo.name}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

interface CurrentPathIndicatorProps {
  folderInfo: FolderType | null;
}
