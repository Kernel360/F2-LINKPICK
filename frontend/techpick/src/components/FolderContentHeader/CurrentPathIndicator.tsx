'use client';

import Link from 'next/link';
import { useTreeStore } from '@/stores';
import { getFolderLinkByType } from '@/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './Breadcrumb';
import type { FolderType } from '@/types';

export function CurrentPathIndicator({
  folderInfo,
}: CurrentPathIndicatorProps) {
  const getAncestorFolderListFromLeaf = useTreeStore(
    (state) => state.getAncestorFolderListFromLeaf
  );
  const ancestorFolderList = getAncestorFolderListFromLeaf(folderInfo);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {ancestorFolderList.map((folderInfo, index) => {
            return (
              <div
                key={folderInfo.id}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {index !== 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {folderInfo.folderType === 'ROOT' ? (
                    '내 폴더'
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={getFolderLinkByType(folderInfo)}>
                        {folderInfo.name}
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
