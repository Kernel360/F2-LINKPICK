'use client';

import { ROUTES } from '@/constants/route';
import { dialogOverlayStyle } from '@/styles/dialogStyle.css';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/Popover/Popover';
import { handleShareFolderLinkCopy } from '@/utils/handleShareFolderLinkCopy';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { ShareFolderStatusContext } from './ShareFolderStatusProvider';
import {
  closeIcon,
  copyButton,
  dialogContent,
  dialogDescription,
  dialogTitle,
  icon,
  linkContent,
  myLinkPageLinkText,
  popoverStyle,
  shareFolderDialogContentStyle,
  sharedFolderLink,
} from './shareFolderDialog.css';

export function ShareFolderDialog() {
  const { isOpenShareFolderDialog, onCloseShareFolderDialog, uuid } =
    useContext(ShareFolderStatusContext);
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const handleShowPopover = () => {
    setShowPopover(true);
    setTimeout(() => setShowPopover(false), 2000);
  };
  const shareFolderLink = `${window.location.origin}/share/${uuid}`;

  return (
    <DialogPrimitive.Root
      open={isOpenShareFolderDialog}
      onOpenChange={onCloseShareFolderDialog}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={dialogOverlayStyle} />
        <DialogPrimitive.Content className={dialogContent}>
          <DialogPrimitive.Title className={dialogTitle}>
            폴더가 공유되었습니다.
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className={dialogDescription}>
            <Link href={ROUTES.MY_PAGE} className={myLinkPageLinkText}>
              <span
                className={linkContent}
                onClick={onCloseShareFolderDialog}
                onKeyDown={(e) => {
                  if (e.key === 'enter') {
                    onCloseShareFolderDialog();
                  }
                }}
              >
                <Settings className={icon} size={14} />
                내설정
              </span>
            </Link>
            에서 공유를 취소할 수 있습니다.
          </DialogPrimitive.Description>
          <div className={shareFolderDialogContentStyle}>
            <div
              className={sharedFolderLink}
              id="shared-folder-link"
              title={shareFolderLink}
            >
              {shareFolderLink}
            </div>
            <Popover open={showPopover}>
              <PopoverTrigger asChild>
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                  className={copyButton}
                  onClick={() => handleShareFolderLinkCopy(handleShowPopover)}
                >
                  Copy
                </button>
              </PopoverTrigger>
              <PopoverContent className={popoverStyle}>Copied</PopoverContent>
            </Popover>
          </div>
          <DialogPrimitive.Close
            className={closeIcon}
            onClick={onCloseShareFolderDialog}
          >
            ×
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
