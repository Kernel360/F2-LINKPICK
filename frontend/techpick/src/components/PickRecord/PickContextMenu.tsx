'use client';

import { memo } from 'react';
import type { PropsWithChildren } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { isEqual } from 'es-toolkit';
import { Trash2 as TrashIcon, CircleX as CircleXIcon } from 'lucide-react';
import { usePickStore, useTreeStore } from '@/stores';
import { getPortalContainer } from '@/utils';
import {
  contextMenuContentLayout,
  contextMenuItemStyle,
} from './pickContextMenu.css';
import { PickInfoType } from '@/types';

interface PickContextMenuProps {
  pickInfo: PickInfoType;
}

const PickContextMenu = memo(
  function MemoizedPickContextMenu({
    pickInfo,
    children,
  }: PropsWithChildren<PickContextMenuProps>) {
    const portalContainer = getPortalContainer();
    const { basicFolderMap } = useTreeStore();

    const recycleBinFolderId = basicFolderMap
      ? basicFolderMap['RECYCLE_BIN'].id
      : -1;
    const isRecycleBinFolder = recycleBinFolderId === pickInfo.parentFolderId;
    const {
      selectedPickIdList,
      setSelectedPickIdList,
      moveSelectedPicksToRecycleBinFolder,
      deleteSelectedPicks,
    } = usePickStore();

    const checkIsSelected = () => {
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
                    recycleBinFolderId,
                  });
                }}
                className={contextMenuItemStyle}
              >
                <CircleXIcon size={16} />
                <p>삭제</p>
              </ContextMenu.Item>
            ) : (
              <ContextMenu.Item
                onSelect={() => {
                  moveSelectedPicksToRecycleBinFolder({
                    picksParentFolderId: pickInfo.parentFolderId,
                    recycleBinFolderId,
                  });
                }}
                className={contextMenuItemStyle}
              >
                <TrashIcon size={16} />
                <p>휴지통으로 이동</p>
              </ContextMenu.Item>
            )}
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    );
  },
  (prevProps, nextProps) => {
    const isEqualPickId = prevProps.pickInfo.id === nextProps.pickInfo.id;
    const isEqualPickTitle =
      prevProps.pickInfo.title === nextProps.pickInfo.title;
    const isEqualSelectedTagList = isEqual(
      prevProps.pickInfo.tagIdOrderedList,
      nextProps.pickInfo.tagIdOrderedList
    );
    const isEqualParentFolderId = isEqual(
      prevProps.pickInfo.parentFolderId,
      nextProps.pickInfo.parentFolderId
    );

    return (
      isEqualPickId &&
      isEqualPickTitle &&
      isEqualSelectedTagList &&
      isEqualParentFolderId
    );
  }
);

PickContextMenu.displayName = 'PickContextMenu';

export { PickContextMenu };
