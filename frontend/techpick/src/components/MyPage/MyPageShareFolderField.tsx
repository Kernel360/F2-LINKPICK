import * as styles from './myPageShareFolderField.css';
import { GetMyShareFolderResponseType } from '@/types';

export function MyPageShareFolderField({
  folderInfo,
  handleDeleteMyShareFolder,
}: MyPageShareFolderFieldProps) {
  const shareFolderLink = `${window.location.origin}/share/${folderInfo.folderAccessToken}`;

  return (
    <div className={styles.myPageContentContainer}>
      <span className={styles.cell}>{folderInfo.sourceFolderName}</span>
      <span className={styles.cell}>
        <a href={shareFolderLink} className={styles.cell} target="_blank">
          {shareFolderLink}
        </a>
      </span>
      <button
        className={styles.cancelButton}
        onClick={() =>
          handleDeleteMyShareFolder(folderInfo.sourceFolderId as number)
        }
      >
        공유 취소
      </button>
    </div>
  );
}

interface MyPageShareFolderFieldProps {
  folderInfo: GetMyShareFolderResponseType;
  handleDeleteMyShareFolder: (sourceFolderId: number) => void;
}
