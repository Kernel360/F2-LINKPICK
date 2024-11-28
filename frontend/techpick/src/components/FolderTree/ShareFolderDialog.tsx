import { useState } from 'react';
import Link from 'next/link';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/Popover/Popover';
import { handleShareFolderLinkCopy } from '@/utils/handleShareFolderLinkCopy';
import * as styles from './shareFolderDialog.css';

export default function ShareFolderDialog({
  uuid,
  onClose,
}: ShareFolderDialogProps) {
  const [showPopover, setshowPopover] = useState<boolean>(false);
  const handleShowPopver = () => {
    setshowPopover(true);
    setTimeout(() => setshowPopover(false), 2000);
  };
  const shareFolderLink = `${window.location.origin}/share/${uuid}`;

  return (
    <DialogPrimitive.Root open={true}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={styles.dialogOverlay}
          onClick={onClose}
        />
        <DialogPrimitive.Content className={styles.dialogContent}>
          <DialogPrimitive.Title className={styles.dialogTitle}>
            폴더가 공유되었습니다.
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className={styles.dialogDescription}>
            <Link href={`/share/${uuid}`} className={styles.myLinkPageLinkText}>
              <span className={styles.linkContent}>
                <Settings className={styles.icon} />
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
            {/**
             * @description: 이벤트 버블링으로 인해 드래그시 폴더가 이동하면서 다이얼로그가 닫히는 현상을 방지하기 위해
             * onMouseDown 이벤트에 event.stopPropagation()을 추가
             */}
            <div
              className={styles.sharedFolderLink}
              onMouseDown={(event) => event.stopPropagation()}
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
          <DialogPrimitive.Close className={styles.closeIcon} onClick={onClose}>
            ×
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

interface ShareFolderDialogProps {
  uuid: string;
  onClose: () => void;
}
