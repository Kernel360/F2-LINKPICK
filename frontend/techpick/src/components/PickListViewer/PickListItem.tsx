import Image from 'next/image';
import { SelectedTagItem, SelectedTagListLayout } from '@/components';
import { useOpenUrlInNewTab } from '@/hooks';
import { useTagStore } from '@/stores';
import { formatDateString } from '@/utils';
import {
  pickListItemLayoutStyle,
  pickImageSectionLayoutStyle,
  pickImageStyle,
  pickEmptyImageStyle,
  pickContentSectionLayoutStyle,
  pickTitleSectionStyle,
  pickDetailInfoLayoutStyle,
  dividerDot,
  dateTextStyle,
} from './pickListItem.css';
import { PickViewItemComponentProps } from './PickListViewer';

export function PickListItem({ pickInfo }: PickViewItemComponentProps) {
  const pick = pickInfo;
  const link = pickInfo.linkInfo;
  const { findTagById } = useTagStore();
  const { openUrlInNewTab } = useOpenUrlInNewTab(link.url);
  return (
    <div className={pickListItemLayoutStyle} onDoubleClick={openUrlInNewTab}>
      <div className={pickImageSectionLayoutStyle}>
        {link.imageUrl ? (
          <Image src={link.imageUrl} className={pickImageStyle} alt="" fill />
        ) : (
          <div className={pickEmptyImageStyle} />
        )}
      </div>
      <div className={pickContentSectionLayoutStyle}>
        <div className={pickTitleSectionStyle}>{pick.title}</div>
        <div className={pickDetailInfoLayoutStyle}>
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
            <p className={dividerDot}>·</p> // divider
          )}
          <p className={dateTextStyle}>{formatDateString(pick.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
}
