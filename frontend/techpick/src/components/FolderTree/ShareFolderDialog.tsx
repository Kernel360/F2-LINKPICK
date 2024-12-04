'use client';

import { useState } from 'react';
import Link from 'next/link';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/Popover/Popover';
import { handleShareFolderLinkCopy } from '@/utils/handleShareFolderLinkCopy';
import * as styles from './shareFolderDialog.css';

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
        <DialogPrimitive.Overlay className={styles.dialogOverlay} />
        <DialogPrimitive.Content className={styles.dialogContent}>
          <DialogPrimitive.Title className={styles.dialogTitle}>
            폴더가 공유되었습니다.
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className={styles.dialogDescription}>
            <Link href={`/mypage`} className={styles.myLinkPageLinkText}>
              <span className={styles.linkContent} onClick={onOpenChange}>
                <Settings className={styles.icon} size={14} />
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
              className={styles.sharedFolderLink}
              id="shared-folder-link"
              title={shareFolderLink}
            >
              {shareFolderLink}
            </div>
            <Popover open={showPopover}>
              <PopoverTrigger asChild>
                <button
                  className={styles.copyButton}
                  onClick={() => handleShareFolderLinkCopy(handleShowPopver)}
                >
                  Copy
                </button>
              </PopoverTrigger>
              <PopoverContent className={styles.popoverStyle}>
                Copied
              </PopoverContent>
            </Popover>
          </div>
          <DialogPrimitive.Close
            className={styles.closeIcon}
            onClick={onOpenChange}
          >
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
