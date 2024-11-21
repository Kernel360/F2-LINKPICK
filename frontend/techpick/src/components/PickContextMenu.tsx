'use client';

import type { PropsWithChildren } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { Trash2 as TrashIcon, CircleX as CircleXIcon } from 'lucide-react';
import { usePickStore } from '@/stores';
import { getPortalContainer } from '@/utils';
import {
  contextMenuContentLayout,
  contextMenuItemStyle,
} from './pickContextMenu.css';
import { BasicFolderMap, PickInfoType } from '@/types';

export function PickContextMenu({
  basicFolderMap,
  pickInfo,
  children,
}: PropsWithChildren<PickContextMenuProps>) {
  const portalContainer = getPortalContainer();
  const isRecycleBinFolder =
    basicFolderMap['RECYCLE_BIN'].id === pickInfo.parentFolderId;
  const {
    selectedPickIdList,
    setSelectedPickIdList,
    moveSelectedPicksToRecycleBinFolder,
    deleteSelectedPicks,
  } = usePickStore();

  /**
   * 1. 우클릭을 눌렀을 떄, 해당 id가 selectedId가 없다면 focus를 변경해야한다.
   * 2. 있다면 넘어감 (multi-select)
   * 3. selected를 한번에 넘긴다. 삭제면 삭제 요청.
   * 휴지통 이동이면 moveFolders
   */

  const checkIsSelected = () => {
    // 선택된게 아니라면
    if (!selectedPickIdList.includes(pickInfo.id)) {
      setSelectedPickIdList([pickInfo.id]);
    }
  };

  return (
    <ContextMenu.Root
      onOpenChange={(open) => {
        if (open) {
          checkIsSelected();
        }

        return;
      }}
    >
      <ContextMenu.Trigger data-pick-draggable={true}>
        {children}
      </ContextMenu.Trigger>
      <ContextMenu.Portal container={portalContainer}>
        <ContextMenu.Content
          className={contextMenuContentLayout}
          data-pick-draggable={true}
        >
          {isRecycleBinFolder ? (
            <ContextMenu.Item
              onSelect={() => {
                deleteSelectedPicks({
                  recycleBinFolderId: basicFolderMap['RECYCLE_BIN'].id,
                });
              }}
              className={contextMenuItemStyle}
            >
              <CircleXIcon />
              <p>삭제</p>
            </ContextMenu.Item>
          ) : (
            <ContextMenu.Item
              onSelect={() => {
                moveSelectedPicksToRecycleBinFolder({
                  picksParentFolderId: pickInfo.parentFolderId,
                  recycleBinFolderId: basicFolderMap['RECYCLE_BIN'].id,
                });
              }}
              className={contextMenuItemStyle}
            >
              <TrashIcon />
              <p>휴지통으로 이동</p>
            </ContextMenu.Item>
          )}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

interface PickContextMenuProps {
  basicFolderMap: BasicFolderMap;
  pickInfo: PickInfoType;
}
