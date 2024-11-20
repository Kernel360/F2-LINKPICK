'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { SelectedTagItem, SelectedTagListLayout } from '@/components';
import { useTagStore } from '@/stores';
import { PickViewItemComponentProps } from './PickListViewer';
import {
  recordImageSectionStyle,
  recordImageStyle,
  recordTitleSectionStyle,
  defaultRecordImageSectionStyle,
  RecordContainerLayout,
  recordBodySectionStyle,
  recordTitleAndBodySectionLayoutStyle,
  recordSubTextStyle,
} from './pickSearchRecord.css';

export function PickSearchRecord({ pickInfo }: PickViewItemComponentProps) {
  const { findTagById } = useTagStore();
  const pick = pickInfo;
  const link = pickInfo.linkInfo;

  const openUrl = useCallback(() => {
    window.open(link.url, '_blank');
  }, [link.url]);

  const formatDate = (dateStringFromServer: string) => {
    const date = new Date(dateStringFromServer);
    const year = date.getFullYear(); // 2023
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 06
    const day = date.getDate().toString().padStart(2, '0'); // 18
    return year + '-' + month + '-' + day;
  };

  return (
    <div className={RecordContainerLayout} onDoubleClick={openUrl}>
      <div className={recordImageSectionStyle}>
        {link.imageUrl ? (
          <Image src={link.imageUrl} className={recordImageStyle} alt="" fill />
        ) : (
          <div className={defaultRecordImageSectionStyle} />
        )}
      </div>
      <div className={recordTitleAndBodySectionLayoutStyle}>
        <div className={recordTitleSectionStyle}>
          <p>{pick.title}</p>
        </div>
        <div className={recordBodySectionStyle}>
          {0 < pick.tagIdOrderedList.length && (
            <SelectedTagListLayout height="fixed">
              {pick.tagIdOrderedList
                .map(findTagById)
                .map(
                  (tag) => tag && <SelectedTagItem key={tag.id} tag={tag} />
                )}
            </SelectedTagListLayout>
          )}
          {0 < pick.tagIdOrderedList.length && (
            <p className={recordSubTextStyle}>·</p> // divider
          )}
          <p className={recordSubTextStyle}>{formatDate(pick.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
}
