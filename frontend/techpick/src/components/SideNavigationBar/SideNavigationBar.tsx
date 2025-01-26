'use client';

import { useDisclosure } from '@/hooks/useDisclosure';
import { useSyncFolderRecord } from '@/hooks/useSyncFolderRecord';
import { useFetchBasicFolders } from '@/queries/useFetchBasicFolders';
import { PlusIcon } from 'lucide-react';
import { ActiveNavigationItemIdProvider } from './ActiveNavigationItemIdProvider';
import { BasicNavigationItemList } from './BasicNavigationItemList';
import { CreateRootChildFolderInput } from './CreateRootChildFolderInput';
import { EditableFolderNavigationItemList } from './EditableFolderNavigationItemList';
import { HorizontalResizableContainer } from './HorizontalResizableContainer';
import { MyPageNavigationItem } from './MyPageNavigationItem';
import { SearchBar } from './SearchBar';
import {
  editableFolderNavigationItemListStyle,
  emptySpaceStyle,
  showCreateRootChildFolderInputButtonStyle,
  sideNavigationBarLayoutStyle,
  sideNavigationTitleLayoutStyle,
  topBorderColor,
} from './sideNavigationBar.css';

export function SideNavigationBar() {
  const { data: basicFolderRecord } = useFetchBasicFolders();
  const rootFolderId = basicFolderRecord?.ROOT.id;
  const {
    isOpen: isCreateRootChildFolder,
    onOpen: onShowCreateRootChildFolderInput,
    onClose,
  } = useDisclosure();
  useSyncFolderRecord();

  return (
    <HorizontalResizableContainer>
      <ActiveNavigationItemIdProvider>
        <div className={sideNavigationBarLayoutStyle}>
          <SearchBar />
          <BasicNavigationItemList />
          <div className={sideNavigationTitleLayoutStyle}>
            <h2>내 폴더</h2>
            {!isCreateRootChildFolder && (
              <button
                type="button"
                onClick={onShowCreateRootChildFolderInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onShowCreateRootChildFolderInput();
                  }
                }}
                className={showCreateRootChildFolderInputButtonStyle}
              >
                <PlusIcon size={20} />
              </button>
            )}
          </div>
          <div className={editableFolderNavigationItemListStyle}>
            {rootFolderId && (
              <CreateRootChildFolderInput
                rootFolderId={rootFolderId}
                isShow={isCreateRootChildFolder}
                onClose={onClose}
              />
            )}
            {rootFolderId && (
              <EditableFolderNavigationItemList
                folderId={rootFolderId}
                depth={'root'}
              />
            )}
            <div className={emptySpaceStyle} />
          </div>
          <div className={topBorderColor}>
            <MyPageNavigationItem />
          </div>
        </div>
      </ActiveNavigationItemIdProvider>
    </HorizontalResizableContainer>
  );
}
