import { useCancelFolderShare } from '@/queries/useCancelFolderShare';
import type { GetMyShareFolderResponseType } from '@/types/GetMyShareFolderResponseType';
import * as styles from './myPageShareFolderField.css';

export function MyPageShareFolderField({
  folderInfo,
}: MyPageShareFolderFieldProps) {
  const shareFolderLink = `${window.location.origin}/share/${folderInfo.folderAccessToken}`;
  const { mutate: cancelFolderShare } = useCancelFolderShare();

  return (
    <div className={styles.myPageContentContainer}>
      <span className={styles.cell}>{folderInfo.sourceFolderName}</span>
      <span className={styles.cell}>
        <a
          href={shareFolderLink}
          className={styles.cell}
          target="_blank"
          rel="noreferrer"
        >
          {shareFolderLink}
        </a>
      </span>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        className={styles.cancelButton}
        onClick={() => cancelFolderShare(folderInfo.sourceFolderId as number)}
      >
        공유 취소
      </button>
    </div>
  );
}

interface MyPageShareFolderFieldProps {
  folderInfo: GetMyShareFolderResponseType;
}
