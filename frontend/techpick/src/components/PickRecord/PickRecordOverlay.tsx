'use client';

import Image from 'next/image';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { useOpenUrlInNewTab } from '@/hooks';
import { usePickStore, useTagStore, useUpdatePickStore } from '@/stores';
import { formatDateString } from '@/utils';
import { PickDateColumnLayout } from './PickDateColumnLayout';
import { PickImageColumnLayout } from './PickImageColumnLayout';
import {
  pickRecordLayoutStyle,
  pickImageStyle,
  pickEmptyImageStyle,
  pickTitleSectionStyle,
  dateTextStyle,
  externalLinkIconStyle,
  linkLayoutStyle,
} from './pickRecordOverlay.css';
import { PickRecordTitleInput } from './PickRecordTitleInput';
import { PickTagColumnLayout } from './PickTagColumnLayout';
import { PickTitleColumnLayout } from './PickTitleColumnLayout';
import { Separator } from './Separator';
import { PickTagPicker } from '../PickTagPicker';
import { PickViewItemComponentProps, TagType } from '@/types';

export function PickRecordOverlay({ pickInfo }: PickViewItemComponentProps) {
  const pick = pickInfo;
  const link = pickInfo.linkInfo;
  const { findTagById } = useTagStore();
  const { updatePickInfo } = usePickStore();
  const { openUrlInNewTab } = useOpenUrlInNewTab(link.url);
  const {
    currentUpdatePickId,
    setCurrentPickIdToNull,
    setCurrentUpdatePickId,
  } = useUpdatePickStore();

  const isUpdateTitle = currentUpdatePickId === pickInfo.id;

  const filteredSelectedTagList: TagType[] = [];

  pickInfo.tagIdOrderedList.forEach((tagId) => {
    const tagInfo = findTagById(tagId);
    if (tagInfo) {
      filteredSelectedTagList.push(tagInfo);
    }
  });

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
      <div className={linkLayoutStyle} onClick={openUrlInNewTab}>
        <ExternalLinkIcon className={externalLinkIconStyle} strokeWidth={2} />
      </div>

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
        <PickTagPicker
          pickInfo={pickInfo}
          selectedTagList={filteredSelectedTagList}
        />
      </PickTagColumnLayout>

      <Separator />

      <PickDateColumnLayout>
        <div className={dateTextStyle}>{formatDateString(pick.updatedAt)}</div>
      </PickDateColumnLayout>
    </div>
  );
}
