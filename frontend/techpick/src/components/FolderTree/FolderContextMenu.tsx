'use client';

import type { PropsWithChildren } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { FolderPen, FolderX } from 'lucide-react';
import { getPortalContainer } from '@/utils';
import {
  contextMenuContentLayout,
  contextMenuItemStyle,
} from './folderContextMenu.css';

export function FolderContextMenu({
  showRenameInput,
  deleteFolder,
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
          <ContextMenu.Item
            className={contextMenuItemStyle}
            onSelect={deleteFolder}
          >
            <FolderX />
            <p>삭제</p>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

interface FolderContextMenuProps {
  showRenameInput: () => void;
  deleteFolder: () => void;
  onShow?: () => void;
}
