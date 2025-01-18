'use client';

import { dialogOverlayStyle } from '@/styles/dialogStyle.css';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/Popover/Popover';
import { handleShareFolderLinkCopy } from '@/utils/handleShareFolderLinkCopy';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
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
  sharedFolderLink,
} from './shareFolderDialog.css';

export default function ShareFolderDialog({
  uuid,
  isOpen,
  onOpenChange,
}: ShareFolderDialogProps) {
  const [showPopover, setshowPopover] = useState<boolean>(false);
  const handleShowPopver = () => {
    setshowPopover(true);
    setTimeout(() => setshowPopover(false), 2000);
  };
  const shareFolderLink = `${window.location.origin}/share/${uuid}`;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={dialogOverlayStyle} />
        <DialogPrimitive.Content className={dialogContent}>
          <DialogPrimitive.Title className={dialogTitle}>
            폴더가 공유되었습니다.
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className={dialogDescription}>
            <Link href={'/mypage'} className={myLinkPageLinkText}>
              <span
                className={linkContent}
                onClick={onOpenChange}
                onKeyDown={(e) => {
                  if (e.key === 'enter') {
                    onOpenChange();
                  }
                }}
              >
                <Settings className={icon} size={14} />
                내설정
              </span>
            </Link>
            에서 공유를 취소할 수 있습니다.
          </DialogPrimitive.Description>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
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
                  onClick={() => handleShareFolderLinkCopy(handleShowPopver)}
                >
                  Copy
                </button>
              </PopoverTrigger>
              <PopoverContent className={popoverStyle}>Copied</PopoverContent>
            </Popover>
          </div>
          <DialogPrimitive.Close className={closeIcon} onClick={onOpenChange}>
            ×
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

interface ShareFolderDialogProps {
  uuid: string;
  isOpen: boolean;
  onOpenChange: () => void;
}
