'use client';

import { useCancelFolderShare } from '@/queries/useCancelFolderShare';
import { useFetchFolders } from '@/queries/useFetchFolders';
import type { FolderIdType } from '@/types/FolderIdType';
import { getFolderInfoByFolderId } from '@/utils/getFolderInfoByFolderId';
import { notifySuccess } from '@/utils/toast';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { FolderPenIcon, FolderXIcon, ScreenShareIcon } from 'lucide-react';
import { type PropsWithChildren, useContext } from 'react';
import { DeleteFolderStatusContext } from './DeleteFolderStatusProvider';
import { ShareFolderStatusContext } from './ShareFolderStatusProvider';
import { UpdateFolderStatusContext } from './UpdateFolderStatusProvider';
import {
  contextMenuContentLayoutStyle,
  contextMenuItemStyle,
} from './editFolderContextMenu.css';

export function EditFolderContextMenu({
  folderId,
  children,
}: PropsWithChildren<EditFolderContextMenuProps>) {
  const { data: folderRecord } = useFetchFolders();
  const { mutate: cancelFolderShare } = useCancelFolderShare();
  const { onOpenUpdateFolderInput } = useContext(UpdateFolderStatusContext);
  const { onOpenDeleteFolderDialog } = useContext(DeleteFolderStatusContext);
  const { onOpenShareFolderDialog } = useContext(ShareFolderStatusContext);
  const folderInfo = getFolderInfoByFolderId({ folderId, folderRecord });
  const isShared = !!folderInfo?.folderAccessToken;

  const handleCancelFolderShare = () => {
    cancelFolderShare(folderId, {
      onSuccess: () => {
        notifySuccess('폴더가 비공개되었습니다.');
      },
    });
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className={contextMenuContentLayoutStyle}>
          <ContextMenu.Item
            onSelect={onOpenUpdateFolderInput}
            className={contextMenuItemStyle}
          >
            <FolderPenIcon size={16} />
            <p>폴더명 변경</p>
          </ContextMenu.Item>

          <ContextMenu.Item
            className={contextMenuItemStyle}
            onSelect={onOpenDeleteFolderDialog}
          >
            <FolderXIcon size={16} />
            <p>휴지통으로 이동</p>
          </ContextMenu.Item>
          {!isShared ? (
            <ContextMenu.Item
              className={contextMenuItemStyle}
              onSelect={() => {
                onOpenShareFolderDialog(folderId);
              }}
            >
              <ScreenShareIcon size={16} />
              <p>공개하기</p>
            </ContextMenu.Item>
          ) : (
            <ContextMenu.Item
              className={contextMenuItemStyle}
              onSelect={handleCancelFolderShare}
            >
              <ScreenShareIcon size={16} />
              <p>비공개하기</p>
            </ContextMenu.Item>
          )}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

interface EditFolderContextMenuProps {
  folderId: FolderIdType;
}
