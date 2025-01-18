'use client';

import { useImageLoader } from '@/hooks/useImageLoader';
import { useFetchTagList } from '@/queries/useFetchTagList';
import type { PickViewItemComponentProps } from '@/types/PickViewItemComponentProps';
import { formatDateString } from '@/utils/formatDateString';
import { getFilteredSelectedTagList } from '@/utils/getFilteredSelectedTagList';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import Image from 'next/image';
import { PickDateColumnLayout } from '../PickRecord/PickDateColumnLayout';
import { PickImageColumnLayout } from '../PickRecord/PickImageColumnLayout';
import { PickTagColumnLayout } from '../PickRecord/PickTagColumnLayout';
import { PickTitleColumnLayout } from '../PickRecord/PickTitleColumnLayout';
import { Separator } from '../PickRecord/Separator';
import {
  dateTextStyle,
  externalLinkIconStyle,
  imageStyle,
  linkLayoutStyle,
  pickImageStyle,
  pickTitleSectionStyle,
} from '../PickRecord/pickRecord.css';
import { PickTagPicker } from '../PickTagPicker/PickTagPicker';
import { pickRecordOverlayLayoutStyle } from './pickRecordOverlay.css';

export function PickRecordOverlay({ pickInfo }: PickViewItemComponentProps) {
  const pick = pickInfo;
  const link = pickInfo.linkInfo;
  const { imageStatus } = useImageLoader(link.imageUrl);
  const { data: tagList = [] } = useFetchTagList();

  const filteredSelectedTagList = getFilteredSelectedTagList({
    tagList,
    selectedTagIdList: pickInfo.tagIdOrderedList,
  });

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
        <div className={pickTitleSectionStyle}>{pick.title}</div>
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
