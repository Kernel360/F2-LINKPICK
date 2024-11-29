'use client';

import Image from 'next/image';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { useOpenUrlInNewTab } from '@/hooks';
import { usePickStore, useTagStore, useUpdatePickStore } from '@/stores';
import { formatDateString } from '@/utils';
import {
  pickRecordLayoutStyle,
  pickImageStyle,
  pickTitleSectionStyle,
  dateTextStyle,
  externalLinkIconStyle,
  linkLayoutStyle,
} from './pickRecordOverlay.css';
import { PickDateColumnLayout } from '../PickRecord/PickDateColumnLayout';
import { PickImageColumnLayout } from '../PickRecord/PickImageColumnLayout';
import { PickRecordTitleInput } from '../PickRecord/PickRecordTitleInput';
import { PickTagColumnLayout } from '../PickRecord/PickTagColumnLayout';
import { PickTitleColumnLayout } from '../PickRecord/PickTitleColumnLayout';
import { Separator } from '../PickRecord/Separator';
import { PickTagPicker } from '../PickTagPicker';
import { PickViewItemComponentProps, TagType } from '@/types';

export function PickRecordOverlay({ pickInfo }: PickViewItemComponentProps) {
  const pick = pickInfo;
  const link = pickInfo.linkInfo;
  const { findTagById } = useTagStore();
  const { updatePickInfo } = usePickStore();
  const { openUrlInNewTab } = useOpenUrlInNewTab(link.url);
  const {
    currentUpdateTitlePickId,
    setCurrentUpdateTitlePickId,
    setCurrentUpdateTitlePickIdToNull,
  } = useUpdatePickStore();

  const isUpdateTitle = currentUpdateTitlePickId === pickInfo.id;

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
            <Image src={'/image/default_image.svg'} alt="" fill sizes="96px" />
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
