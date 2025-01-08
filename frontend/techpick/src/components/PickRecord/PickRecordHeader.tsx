'use client';

import { PickDateColumnLayout } from './PickDateColumnLayout';
import { PickImageColumnLayout } from './PickImageColumnLayout';
import {
  pickRecordHeaderLayoutStyle,
  columnStyle,
} from './pickRecordHeader.css';
import { PickTagColumnLayout } from './PickTagColumnLayout';
import { PickTitleColumnLayout } from './PickTitleColumnLayout';
import { Separator } from './Separator';

export function PickRecordHeader() {
  return (
    <div className={pickRecordHeaderLayoutStyle}>
      <PickImageColumnLayout>
        <div className={columnStyle}>이미지</div>
      </PickImageColumnLayout>

      <Separator />

      <PickTitleColumnLayout>
        <div className={columnStyle}>제목</div>
      </PickTitleColumnLayout>

      <Separator />
      <PickTagColumnLayout>
        <div className={columnStyle}>태그</div>
      </PickTagColumnLayout>

      <Separator />

      <PickDateColumnLayout>
        <div className={columnStyle}>수정일</div>
      </PickDateColumnLayout>
    </div>
  );
}
