'use client';

import { useState } from 'react';
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
} from './pickRecord.css';
import { PickRecordTitleInput } from './PickRecordTitleInput';
import { PickTagColumnLayout } from './PickTagColumnLayout';
import { PickTitleColumnLayout } from './PickTitleColumnLayout';
import { Separator } from './Separator';
import { PickTagPicker } from '../PickTagPicker';
import { PickViewItemComponentProps, TagType } from '@/types';

export function PickRecord({ pickInfo }: PickViewItemComponentProps) {
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
  const [isHovered, setIsHovered] = useState(false);
  const isUpdateTitle = currentUpdateTitlePickId === pickInfo.id;
  const { isDragging } = usePickStore();

  const filteredSelectedTagList: TagType[] = [];

  pickInfo.tagIdOrderedList.forEach((tagId) => {
    const tagInfo = findTagById(tagId);
    if (tagInfo) {
      filteredSelectedTagList.push(tagInfo);
    }
  });

  return (
    <div
      className={pickRecordLayoutStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <PickImageColumnLayout>
        <div className={pickImageStyle}>
          {link.imageUrl ? (
            <Image src={link.imageUrl} alt="" fill sizes="96px" />
          ) : (
            <div className={pickEmptyImageStyle} />
          )}
        </div>
      </PickImageColumnLayout>
      {isHovered && !isDragging && (
        <div className={linkLayoutStyle} onClick={openUrlInNewTab}>
          <ExternalLinkIcon className={externalLinkIconStyle} strokeWidth={2} />
        </div>
      )}

      <Separator />

      <PickTitleColumnLayout>
        <div
          className={pickTitleSectionStyle}
          onDoubleClick={(event) => {
            setCurrentUpdateTitlePickId(pickInfo.id);
            event.stopPropagation();
          }}
          role="button"
        >
          {pick.title}
        </div>
        {isUpdateTitle && (
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
