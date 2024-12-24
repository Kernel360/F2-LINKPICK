'use client';

import Image from 'next/image';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { useTagStore } from '@/stores';
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
import { PickTagColumnLayout } from '../PickRecord/PickTagColumnLayout';
import { PickTitleColumnLayout } from '../PickRecord/PickTitleColumnLayout';
import { Separator } from '../PickRecord/Separator';
import { PickTagPicker } from '../PickTagPicker';
import { PickViewItemComponentProps, TagType } from '@/types';

export function PickRecordOverlay({ pickInfo }: PickViewItemComponentProps) {
  const pick = pickInfo;
  const link = pickInfo.linkInfo;
  const { findTagById } = useTagStore();

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
