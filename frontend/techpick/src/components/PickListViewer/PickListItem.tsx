'use client';

import { useOpenUrlInNewTab } from '@/hooks/useOpenUrlInNewTab';
import { useFetchTagList } from '@/queries/useFetchTagList';
import { usePickStore } from '@/stores/pickStore/pickStore';
import { useUpdatePickStore } from '@/stores/updatePickStore';
import { formatDateString } from '@/utils/formatDateString';
import { getFilteredSelectedTagList } from '@/utils/getFilteredSelectedTagList';
import Image from 'next/image';
import { SelectedTagItem } from '../SelectedTagItem/SelectedTagItem';
import { SelectedTagListLayout } from '../SelectedTagListLayout/SelectedTagListLayout';
import type { PickViewItemComponentProps } from './PickListViewer';
import { PickTitleInput } from './PickTitleInput';
import {
  dateTextStyle,
  dividerDot,
  pickContentSectionLayoutStyle,
  pickDetailInfoLayoutStyle,
  pickEmptyImageStyle,
  pickImageSectionLayoutStyle,
  pickImageStyle,
  pickListItemLayoutStyle,
  pickTitleSectionStyle,
} from './pickListItem.css';

export function PickListItem({ pickInfo }: PickViewItemComponentProps) {
  const pick = pickInfo;
  const link = pickInfo.linkInfo;
  const { updatePickInfo } = usePickStore();
  const { openUrlInNewTab } = useOpenUrlInNewTab(link.url);
  const {
    currentUpdateTitlePickId,
    setCurrentUpdateTitlePickIdToNull,
    setCurrentUpdateTitlePickId,
  } = useUpdatePickStore();
  const { data: tagList = [] } = useFetchTagList();
  const filteredSelectedTagList = getFilteredSelectedTagList({
    tagList,
    selectedTagIdList: pickInfo.tagIdOrderedList,
  });

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
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div
            className={pickTitleSectionStyle}
            onClick={(event) => {
              setCurrentUpdateTitlePickId(pickInfo.id);
              event.stopPropagation();
            }}
          >
            {pick.title}
          </div>
        )}
        <div className={pickDetailInfoLayoutStyle}>
          {0 < pick.tagIdOrderedList.length && (
            <SelectedTagListLayout height="fixed">
              {filteredSelectedTagList.map(
                (tag) => tag && <SelectedTagItem key={tag.id} tag={tag} />,
              )}
            </SelectedTagListLayout>
          )}
          {0 < pick.tagIdOrderedList.length && (
            <p className={dividerDot}>·</p> // divider
          )}
          <p className={dateTextStyle}>{formatDateString(pick.updatedAt)}</p>
        </div>
      </div>

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
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
