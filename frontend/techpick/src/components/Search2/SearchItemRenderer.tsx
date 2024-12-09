import React, { CSSProperties } from 'react';
import { useTreeStore } from '@/stores';
import { useSearchPickStore } from '@/stores/searchPickStore';
import { formatDateString } from '@/utils';
import * as styles from './searchItemRenderer.css';
import { CurrentPathIndicator } from '../FolderContentHeader/CurrentPathIndicator';
import { PickInfoType } from '@/types';

export default function SearchItemRenderer({
  item,
  index,
  style,
}: ItemRendererProps) {
  const { getFolderInfoByFolderId } = useTreeStore();
  const { setHoverPickIndex } = useSearchPickStore();
  const folderInfo = getFolderInfoByFolderId(item.parentFolderId);

  const handleMouseEnter = () => {
    setHoverPickIndex(index);
  };

  if (!item) {
    return <div style={style}>Loading...</div>;
  }

  return (
    <div
      style={{
        ...style,
      }}
      className={styles.searchListItemContainer}
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
}
