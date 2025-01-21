import { useFetchFolders } from '@/queries/useFetchFolders';
import { useSearchPickStore } from '@/stores/searchPickStore';
import type { PickInfoType } from '@/types/PickInfoType';
import { formatDateString } from '@/utils/formatDateString';
import { getFolderInfoByFolderId } from '@/utils/getFolderInfoByFolderId';
import { useRouter } from 'next/navigation';
import type { CSSProperties } from 'react';
import { CurrentPathIndicator } from '../FolderContentHeader/CurrentPathIndicator';
import * as styles from './searchItemRenderer.css';

// TODO: 미분류폴더와 휴지통 폴더를 어떻게 구분하지?
// => 검색 데이터로 redirect 시키자!
export default function SearchItemRenderer({
  item,
  index,
  style,
  onClose,
}: ItemRendererProps) {
  const router = useRouter();
  const { setHoverPickIndex } = useSearchPickStore();
  const { data: folderRecord } = useFetchFolders();
  const folderInfo = getFolderInfoByFolderId({
    folderId: item.parentFolderId,
    folderRecord,
  });

  const handleMouseEnter = () => {
    setHoverPickIndex(index);
  };

  const handleClick = () => {
    onClose();

    let targetLocation = '';
    switch (folderInfo?.folderType) {
      case 'RECYCLE_BIN':
        targetLocation = 'recycle-bin';
        break;
      case 'GENERAL':
        targetLocation = folderInfo?.id.toString();
    }
    /**
     * @description
     */
    const date = new Date();
    router.push(
      `/folders/${targetLocation}?searchId=pickId-${item.id}&dateId=${date.getMilliseconds()}`,
    );
  };

  if (!item) {
    return <div style={style}>Loading...</div>;
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      style={{
        ...style,
      }}
      className={styles.searchListItemContainer}
      onClick={handleClick}
    >
      <div
        className={styles.searchListItemTextContainer}
        onMouseEnter={handleMouseEnter}
      >
        <h3 className={styles.searchListItemTitle}>{item.title}</h3>
        <span className={styles.searchListItemDate}>
          {formatDateString(item.createdAt)}
        </span>
      </div>
      <CurrentPathIndicator folderInfo={folderInfo} />
    </div>
  );
}

interface ItemRendererProps {
  item: PickInfoType;
  index: number;
  style: CSSProperties;
  onClose: () => void;
}
