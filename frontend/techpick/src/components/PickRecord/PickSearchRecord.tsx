'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { useOpenUrlInNewTab } from '@/hooks';
import { usePickStore, useTagStore } from '@/stores';
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
} from './pickSearchRecord.css';
import { PickTagColumnLayout } from './PickTagColumnLayout';
import { PickTitleColumnLayout } from './PickTitleColumnLayout';
import { Separator } from './Separator';
import { SelectedTagItem } from '../SelectedTagItem';
import { SelectedTagListLayout } from '../SelectedTagListLayout/SelectedTagListLayout';
import { PickViewItemComponentProps, TagType } from '@/types';

export function PickSearchRecord({ pickInfo }: PickViewItemComponentProps) {
  const pick = pickInfo;
  const link = pickInfo.linkInfo;
  const { findTagById } = useTagStore();
  const { openUrlInNewTab } = useOpenUrlInNewTab(link.url);
  const [isHovered, setIsHovered] = useState(false);
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
            <Image src={link.imageUrl} alt="" fill />
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
          onClick={(event) => {
            event.stopPropagation();
          }}
          role="button"
        >
          {pick.title}
        </div>
      </PickTitleColumnLayout>

      <Separator />

      <PickTagColumnLayout>
        <SelectedTagListLayout>
          {filteredSelectedTagList.map((tag) => (
            <SelectedTagItem key={tag.name} tag={tag} />
          ))}
        </SelectedTagListLayout>
      </PickTagColumnLayout>

      <Separator />

      <PickDateColumnLayout>
        <div className={dateTextStyle}>{formatDateString(pick.updatedAt)}</div>
      </PickDateColumnLayout>
    </div>
  );
}
