'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { FolderOpenIcon } from 'lucide-react';
import {
  indicatorBodyLayoutStyle,
  indicatorLayoutStyle,
  indicatorTitleStyle,
} from '@/components/FolderPathIndicator/CurrentPathIndicator.css';
import { ROUTES } from '@/constants';
import { useTreeStore } from '@/stores';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/ui/Breadcrumb/Breadcrumb';
import { Text } from '@/ui/Text/Text';
import { FolderType } from '@/types';

/**
 *  (1) 폴더 선택 시 : 현재 어디 폴터를 클릭 했는지?
 *  (2) 검색시 : 검색 결과는 몇개 인지?
 */
export function CurrentPathIndicator() {
  // next.js client component hook
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // -------------------------------------------------------------
  const [currentFolder, setCurrentFolder] = useState<FolderType | null>(null);
  const { getFolderInfoByFolderId } = useTreeStore();
  const basicFolderMap = useTreeStore((state) => state.basicFolderMap);
  const [indicatorContext, setIndicatorContext] = useState<
    'SELECT' | 'SEARCH'
  >();

  useEffect(
    function getCurrentPathContext() {
      setIndicatorContext(pathname === ROUTES.SEARCH ? 'SEARCH' : 'SELECT');
      setCurrentFolder(getFolderByPathname(pathname));
    },
    [pathname, searchParams]
  );

  const getFolderByPathname = (pathname: string): FolderType | null => {
    if (!basicFolderMap) return null;

    switch (pathname) {
      case ROUTES.FOLDERS_UNCLASSIFIED:
        return basicFolderMap.UNCLASSIFIED;
      case ROUTES.FOLDERS_RECYCLE_BIN:
        return basicFolderMap.RECYCLE_BIN;
      case ROUTES.FOLDERS_ROOT:
        return basicFolderMap.ROOT;
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
    while (currentFolder) {
      pathListFromLeaf.push(currentFolder);
      currentFolder = getFolderInfoByFolderId(currentFolder.parentFolderId);
    }
    return pathListFromLeaf.reverse();
  };

  return (
    <div className={indicatorLayoutStyle}>
      {/* -----------------------------------------------------------*/}
      {/* TODO: 검색 결과에 대한 뷰는 다르게 할 것.*/}
      {/* -----------------------------------------------------------*/}
      {/* 폴더 선택에 대한 뷰 */}
      {indicatorContext === 'SELECT' && (
        <>
          {/*<div style={{ backgroundColor: colorVars.gray3, height: '140px' }}>*/}
          {/*currentFolder.image*/}
          {/*</div>*/}
          {currentFolder?.folderType === 'GENERAL' && (
            <div className={indicatorBodyLayoutStyle}>
              <div className={indicatorTitleStyle}>
                <FolderOpenIcon size={28} />
                <Text size={'4xl'} weight={'regular'}>
                  {currentFolder?.name}
                </Text>
              </div>
              <PathIndicator
                folderListFromParentToChild={getFullFolderPathFromLeaf(
                  currentFolder
                )}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

interface PathIndicatorProps {
  // List [A, B, C] --> Breadcrumb  (A) / (B) / (C)
  folderListFromParentToChild: FolderType[];
}

export function PathIndicator(props: PathIndicatorProps) {
  const getFolderLinkByType = (folder: FolderType) => {
    switch (folder.folderType) {
      case 'ROOT':
        return (
          <BreadcrumbLink href={`${ROUTES.FOLDERS_ROOT}`}>
            {'내 컬렉션'}
          </BreadcrumbLink>
        );
      case 'UNCLASSIFIED':
        return (
          <BreadcrumbLink href={`${ROUTES.FOLDERS_UNCLASSIFIED}`}>
            {'미분류'}
          </BreadcrumbLink>
        );
      case 'RECYCLE_BIN':
        return (
          <BreadcrumbLink href={`${ROUTES.FOLDERS_RECYCLE_BIN}`}>
            {'휴지통'}
          </BreadcrumbLink>
        );
      default:
        return (
          <BreadcrumbLink href={`${ROUTES.FOLDER_DETAIL(folder.id)}`}>
            {folder.name}
          </BreadcrumbLink>
        );
    }
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {props.folderListFromParentToChild.map((folder, idx, array) => (
            <BreadcrumbItem key={idx}>
              {0 < idx && idx < array.length && (
                <BreadcrumbSeparator>
                  {/* defaults to '>' */}
                </BreadcrumbSeparator>
              )}
              {getFolderLinkByType(folder)}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
