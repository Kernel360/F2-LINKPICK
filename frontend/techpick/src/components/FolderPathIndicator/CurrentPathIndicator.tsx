'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/Breadcrumb/Breadcumb';
import { indicatorLayoutStyle } from '@/components/FolderPathIndicator/CurrentPathIndicator.css';
import { ROUTES } from '@/constants';
import { useTreeStore } from '@/stores';
import { FolderType } from '@/types';

/**
 *  (1) 폴더 선택 시 : 현재 어디 폴터를 클릭 했는지?
 *  (2) 검색시 : 검색 결과는 몇개 인지?
 */
export function CurrentPathIndicator() {
  // next.js client component hook
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // search module
  // const { getSearchResult } = usePickStore();
  const { getFolderInfoByFolderId } = useTreeStore();
  const basicFolderMap = useTreeStore((state) => state.basicFolderMap);
  const [indicatorContext, setIndicatorContext] = useState<
    'SELECT' | 'SEARCH'
  >();

  useEffect(
    function getCurrentPathContext() {
      setIndicatorContext(pathname === ROUTES.SEARCH ? 'SEARCH' : 'SELECT');
    },
    [pathname, searchParams]
  );

  const getFolderListFromRoot = () => {
    const currentFolder = getFolderByPathname(pathname);
    return getFullFolderPathFromLeaf(currentFolder);
  };

  const getFolderByPathname = (pathname: string): FolderType | null => {
    if (!basicFolderMap) return null;

    switch (pathname) {
      case ROUTES.FOLDERS_UNCLASSIFIED:
        return basicFolderMap.UNCLASSIFIED;
      case ROUTES.FOLDERS_RECYCLE_BIN:
        return basicFolderMap.RECYCLE_BIN;
      default:
        return getFolderInfoByFolderId(
          parseInt(pathname.substring(pathname.lastIndexOf('/') + 1))
        );
    }
  };

  const getFullFolderPathFromLeaf = (leaf: FolderType | null) => {
    if (!leaf) return [];
    const pathListFromLeaf: FolderType[] = [];

    let currentFolder = getFolderInfoByFolderId(leaf.id);
    while (currentFolder?.parentFolderId) {
      pathListFromLeaf.push(currentFolder);
      currentFolder = getFolderInfoByFolderId(currentFolder.parentFolderId);
    }
    return pathListFromLeaf.reverse();
  };

  return (
    <div className={indicatorLayoutStyle}>
      {indicatorContext === 'SELECT' && (
        <PathIndicator folderListFromParentToChild={getFolderListFromRoot()} />
      )}
    </div>
  );
}

interface PathIndicatorProps {
  // List [A, B, C] --> Breadcrumb  (A) / (B) / (C)
  folderListFromParentToChild: FolderType[];
}

export function PathIndicator(props: PathIndicatorProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {props.folderListFromParentToChild.map((folder, idx, array) => (
          <BreadcrumbItem key={idx}>
            {idx < array.length && <BreadcrumbSeparator />}
            <BreadcrumbLink href={`${ROUTES.FOLDER_DETAIL(folder.id)}`}>
              {folder.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
