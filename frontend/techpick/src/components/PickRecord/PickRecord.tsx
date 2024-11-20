'use client';

import Image from 'next/image';
import { useOpenUrlInNewTab } from '@/hooks';
import { usePickStore, useUpdatePickStore } from '@/stores';
import { formatDateString } from '@/utils';
import { PickDateColumnLayout } from './PickDateColumnLayout';
import { PickImageColumnLayout } from './PickImageColumnLayout';
import {
  pickRecordLayoutStyle,
  pickImageStyle,
  pickEmptyImageStyle,
  pickTitleSectionStyle,
  dateTextStyle,
} from './pickRecord.css';
import { PickRecordTitleInput } from './PickRecordTitleInput';
import { PickTagColumnLayout } from './PickTagColumnLayout';
import { PickTitleColumnLayout } from './PickTitleColumnLayout';
import { Separator } from './Separator';
import { PickViewItemComponentProps } from '@/types';

export function PickRecord({ pickInfo }: PickViewItemComponentProps) {
  const pick = pickInfo;
  const link = pickInfo.linkInfo;
  // const { findTagById } = useTagStore();
  const { updatePickInfo } = usePickStore();
  const { openUrlInNewTab } = useOpenUrlInNewTab(link.url);
  const {
    currentUpdatePickId,
    setCurrentPickIdToNull,
    setCurrentUpdatePickId,
  } = useUpdatePickStore();
  const isUpdateTitle = currentUpdatePickId === pickInfo.id;

  return (
    <div className={pickRecordLayoutStyle}>
      <PickImageColumnLayout>
        <div className={pickImageStyle}>
          {link.imageUrl ? (
            <Image src={link.imageUrl} alt="" fill />
          ) : (
            <div className={pickEmptyImageStyle} />
          )}
        </div>
      </PickImageColumnLayout>

      <Separator />

      <PickTitleColumnLayout>
        {isUpdateTitle ? (
          <PickRecordTitleInput
            initialValue={pick.title}
            onSubmit={(newTitle) => {
              updatePickInfo(pick.parentFolderId, {
                ...pickInfo,
                title: newTitle,
              });
              setCurrentPickIdToNull();
            }}
            onClickOutSide={() => {
              setCurrentPickIdToNull();
            }}
          />
        ) : (
          <div
            className={pickTitleSectionStyle}
            onClick={(event) => {
              setCurrentUpdatePickId(pickInfo.id);
              event.stopPropagation();
            }}
            role="button"
          >
            {pick.title}
          </div>
        )}
      </PickTitleColumnLayout>

      <Separator />
      <PickTagColumnLayout>
        <div style={{ width: '320px' }}>Tags</div>
      </PickTagColumnLayout>

      <Separator />

      <PickDateColumnLayout>
        <div className={dateTextStyle}>{formatDateString(pick.updatedAt)}</div>
      </PickDateColumnLayout>

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
