'use client';

import Image from 'next/image';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { useImageLoader } from '@/hooks';
import { useTagStore } from '@/stores';
import { formatDateString } from '@/utils';
import { pickRecordOverlayLayoutStyle } from './pickRecordOverlay.css';
import { PickDateColumnLayout } from '../PickRecord/PickDateColumnLayout';
import { PickImageColumnLayout } from '../PickRecord/PickImageColumnLayout';
import {
  pickImageStyle,
  pickTitleSectionStyle,
  dateTextStyle,
  linkLayoutStyle,
  externalLinkIconStyle,
  imageStyle,
} from '../PickRecord/pickRecord.css';
import { PickTagColumnLayout } from '../PickRecord/PickTagColumnLayout';
import { PickTitleColumnLayout } from '../PickRecord/PickTitleColumnLayout';
import { Separator } from '../PickRecord/Separator';
import { PickTagPicker } from '../PickTagPicker';
import { PickViewItemComponentProps, TagType } from '@/types';

export function PickRecordOverlay({ pickInfo }: PickViewItemComponentProps) {
  const pick = pickInfo;
  const link = pickInfo.linkInfo;
  const { findTagById } = useTagStore();
  const { imageStatus } = useImageLoader(link.imageUrl);

  const filteredSelectedTagList: TagType[] = pickInfo.tagIdOrderedList
    .map((tagId) => findTagById(tagId))
    .filter((tag): tag is TagType => tag !== undefined);

  return (
    <div className={pickRecordOverlayLayoutStyle}>
      <PickImageColumnLayout>
        <div className={pickImageStyle}>
          {imageStatus === 'loaded' ? (
            <img
              src={link.imageUrl}
              alt=""
              width="96px"
              height="47.25px"
              className={imageStyle}
            />
          ) : (
            <Image src="/image/default_image.svg" alt="" fill sizes="96px" />
          )}
        </div>
      </PickImageColumnLayout>
      <div className={linkLayoutStyle}>
        <ExternalLinkIcon className={externalLinkIconStyle} strokeWidth={2} />
      </div>

      <Separator />

      <PickTitleColumnLayout>
        <div className={pickTitleSectionStyle} role="button">
          {pick.title}
        </div>
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
