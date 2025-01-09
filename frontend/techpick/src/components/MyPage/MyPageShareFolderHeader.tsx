import * as styles from './myPageShareFolderHeader.css';

/**
 * @@description 추후 공통 컴포넌트로 사용하려면 props로 받아서 사용하도록 변경
 */
export function MyPageShareFolderHeader() {
  return (
    <div className={styles.myPageContentContainerHeader}>
      <span className={styles.cell}>폴더명</span>
      <span className={styles.cell}>공개 주소</span>
    </div>
  );
}
