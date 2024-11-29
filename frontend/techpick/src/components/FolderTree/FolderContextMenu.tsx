'use client';

import type { PropsWithChildren } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import * as Dialog from '@radix-ui/react-dialog';
import { FolderPen, FolderX, ScreenShare } from 'lucide-react';
import { getPortalContainer } from '@/utils';
import {
  contextMenuContentLayout,
  contextMenuItemStyle,
} from './folderContextMenu.css';

export function FolderContextMenu({
  showRenameInput,
  shareFolder,
  onShow = () => {},
  children,
}: PropsWithChildren<FolderContextMenuProps>) {
  const portalContainer = getPortalContainer();

  return (
    <ContextMenu.Root
      onOpenChange={(open) => {
        if (open) {
          onShow();
        }

        return;
      }}
    >
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal container={portalContainer}>
        <ContextMenu.Content className={contextMenuContentLayout}>
          <ContextMenu.Item
            onSelect={showRenameInput}
            className={contextMenuItemStyle}
          >
            <FolderPen />
            <p>폴더명 변경</p>
          </ContextMenu.Item>
          <Dialog.Trigger asChild>
            <ContextMenu.Item className={contextMenuItemStyle}>
              <FolderX />
              <p>휴지통으로 이동</p>
            </ContextMenu.Item>
          </Dialog.Trigger>
          <ContextMenu.Item
            className={contextMenuItemStyle}
            onSelect={shareFolder}
          >
            <ScreenShare />
            <p>공유하기</p>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

interface FolderContextMenuProps {
  showRenameInput: () => void;
  shareFolder: () => void;
  onShow?: () => void;
}
