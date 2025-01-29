'use client';

import { useDeletePicks } from '@/queries/useDeletePicks';
import { useFetchBasicFolders } from '@/queries/useFetchBasicFolders';
import { useMovePicksToDifferentFolder } from '@/queries/useMovePicksToDifferentFolder';
import { usePickStore } from '@/stores/pickStore';
import type { PickInfoType } from '@/types/PickInfoType';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { isEqual } from 'es-toolkit';
import { CircleX as CircleXIcon, Trash2 as TrashIcon } from 'lucide-react';
import { type PropsWithChildren, memo } from 'react';
import {
  contextMenuContentLayout,
  contextMenuItemStyle,
} from './pickContextMenu.css';

interface PickContextMenuProps {
  pickInfo: PickInfoType;
}

const PickContextMenu = memo(
  function MemoizedPickContextMenu({
    pickInfo,
    children,
  }: PropsWithChildren<PickContextMenuProps>) {
    const { data: basicFolderRecord } = useFetchBasicFolders();
    const recycleBinFolderId = basicFolderRecord?.RECYCLE_BIN.id;
    const isRecycleBinFolder = recycleBinFolderId === pickInfo.parentFolderId;
    const selectedPickIdList = usePickStore(
      (state) => state.selectedPickIdList,
    );
    const setSelectedPickIdList = usePickStore(
      (state) => state.setSelectedPickIdList,
    );
    const { mutate: movePicksToDifferentFolder } =
      useMovePicksToDifferentFolder();
    const { mutate: deletePicks } = useDeletePicks();

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
        <ContextMenu.Portal>
          <ContextMenu.Content
            className={contextMenuContentLayout}
            data-pick-draggable={true}
          >
            {isRecycleBinFolder ? (
              <ContextMenu.Item
                onSelect={() => {
                  if (recycleBinFolderId) {
                    deletePicks({
                      recycleBinFolderId,
                      deletePickIdList: selectedPickIdList,
                    });
                  }
                }}
                className={contextMenuItemStyle}
              >
                <CircleXIcon size={16} />
                <p>삭제</p>
              </ContextMenu.Item>
            ) : (
              <ContextMenu.Item
                onSelect={() => {
                  if (recycleBinFolderId) {
                    movePicksToDifferentFolder({
                      fromPickId: pickInfo.parentFolderId,
                      sourceFolderId: pickInfo.parentFolderId,
                      movePicksInfo: {
                        destinationFolderId: recycleBinFolderId,
                        idList: selectedPickIdList,
                      },
                    });
                  }
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
      nextProps.pickInfo.tagIdOrderedList,
    );
    const isEqualParentFolderId = isEqual(
      prevProps.pickInfo.parentFolderId,
      nextProps.pickInfo.parentFolderId,
    );

    return (
      isEqualPickId &&
      isEqualPickTitle &&
      isEqualSelectedTagList &&
      isEqualParentFolderId
    );
  },
);

PickContextMenu.displayName = 'PickContextMenu';

export { PickContextMenu };
