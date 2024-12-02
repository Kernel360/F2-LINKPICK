'use client';

import Image from 'next/image';
import { SelectedTagItem, SelectedTagListLayout } from '@/components';
import { useOpenUrlInNewTab } from '@/hooks';
import { usePickStore, useTagStore, useUpdatePickStore } from '@/stores';
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
import { PickTitleInput } from './PickTitleInput';

export function PickListItem({ pickInfo }: PickViewItemComponentProps) {
  const pick = pickInfo;
  const link = pickInfo.linkInfo;
  const { findTagById } = useTagStore();
  const { updatePickInfo } = usePickStore();
  const { openUrlInNewTab } = useOpenUrlInNewTab(link.url);
  const {
    currentUpdateTitlePickId,
    setCurrentUpdateTitlePickIdToNull,
    setCurrentUpdateTitlePickId,
  } = useUpdatePickStore();
  const isUpdateTitle = currentUpdateTitlePickId === pickInfo.id;

  return (
    <div className={pickListItemLayoutStyle}>
      <div className={pickImageSectionLayoutStyle}>
        {link.imageUrl ? (
          <Image src={link.imageUrl} className={pickImageStyle} alt="" fill />
        ) : (
          <div className={pickEmptyImageStyle} />
        )}
      </div>
      <div className={pickContentSectionLayoutStyle}>
        {isUpdateTitle ? (
          <PickTitleInput
            initialValue={pick.title}
            onSubmit={(newTitle) => {
              updatePickInfo(pick.parentFolderId, {
                ...pickInfo,
                title: newTitle,
              });
              setCurrentUpdateTitlePickIdToNull();
            }}
            onClickOutSide={() => {
              setCurrentUpdateTitlePickIdToNull();
            }}
          />
        ) : (
          <div
            className={pickTitleSectionStyle}
            onClick={(event) => {
              setCurrentUpdateTitlePickId(pickInfo.id);
              event.stopPropagation();
            }}
            role="button"
          >
            {pick.title}
          </div>
        )}
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

      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '30px',
          height: '30px',
          backgroundColor: 'red',
          cursor: 'pointer',
        }}
        onClick={openUrlInNewTab}
        data-description={'나중에 hover시에 링크보여주기'}
      >
        link
      </div>
    </div>
  );
}
