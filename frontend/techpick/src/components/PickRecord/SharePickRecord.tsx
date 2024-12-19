'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { postSharedPickViewEventLog } from '@/apis/eventLog';
import { useOpenUrlInNewTab } from '@/hooks';
import { formatDateString } from '@/utils';
import { PickDateColumnLayout } from './PickDateColumnLayout';
import { PickImageColumnLayout } from './PickImageColumnLayout';
import {
  pickRecordLayoutStyle,
  pickImageStyle,
  pickTitleSectionStyle,
  dateTextStyle,
  externalLinkIconStyle,
  linkLayoutStyle,
} from './pickRecord.css';
import { PickTagColumnLayout } from './PickTagColumnLayout';
import { PickTitleColumnLayout } from './PickTitleColumnLayout';
import { Separator } from './Separator';
import {
  tagPickerLayout,
  tagDialogTriggerLayout,
  tagPickerPlaceholderStyle,
} from '../PickTagPicker/pickTagPicker.css';
import { SelectedTagItem } from '../SelectedTagItem';
import { SelectedTagListLayout } from '../SelectedTagListLayout/SelectedTagListLayout';
import { TagType } from '@/types';
import { components } from '@/schema';

export function SharePickRecord({
  pickInfo,
  tagList,
  folderAccessToken,
}: SharePickRecordProps) {
  const link = pickInfo.linkInfo!;
  const { openUrlInNewTab } = useOpenUrlInNewTab(link.url);
  const [isHovered, setIsHovered] = useState(false);

  const onClickLink = async () => {
    try {
      openUrlInNewTab();
      await postSharedPickViewEventLog({
        url: link.url,
        folderAccessToken,
      });
    } catch {
      /*empty */
    }
  };

  return (
    <div
      className={pickRecordLayoutStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClickLink}
    >
      <PickImageColumnLayout>
        <div className={pickImageStyle}>
          {link.imageUrl && link.imageUrl !== '' ? (
            <Image src={link.imageUrl} alt="" fill sizes="96px" />
          ) : (
            <Image src={'/image/default_image.svg'} alt="" fill sizes="96px" />
          )}
        </div>
      </PickImageColumnLayout>
      {isHovered && (
        <div className={linkLayoutStyle}>
          <ExternalLinkIcon className={externalLinkIconStyle} strokeWidth={2} />
        </div>
      )}

      <Separator />

      <PickTitleColumnLayout>
        <div className={pickTitleSectionStyle} role="button">
          {pickInfo.title}
        </div>
      </PickTitleColumnLayout>

      <Separator />

      <PickTagColumnLayout>
        <div className={tagPickerLayout}>
          <div className={tagDialogTriggerLayout}>
            {pickInfo.tagIdxList!.length === 0 && (
              <p className={tagPickerPlaceholderStyle}>태그가 없습니다.</p>
            )}
            <SelectedTagListLayout>
              {pickInfo.tagIdxList!.map((tagIdx) => (
                <SelectedTagItem
                  key={tagIdx}
                  tag={{ id: tagIdx, ...tagList[tagIdx] } as TagType}
                />
              ))}
            </SelectedTagListLayout>
          </div>
        </div>
      </PickTagColumnLayout>

      <Separator />

      <PickDateColumnLayout>
        <div className={dateTextStyle}>
          {formatDateString(pickInfo.updatedAt as string)}
        </div>
      </PickDateColumnLayout>
    </div>
  );
}

interface SharePickRecordProps {
  pickInfo: components['schemas']['baguni.api.domain.sharedFolder.dto.SharedFolderResult$SharedPickInfo'];
  tagList: components['schemas']['baguni.api.domain.sharedFolder.dto.SharedFolderResult$SharedTagInfo'][];
  folderAccessToken: string;
}
