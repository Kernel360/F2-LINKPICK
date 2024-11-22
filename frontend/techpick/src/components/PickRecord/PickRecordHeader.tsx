'use client';

import { PickDateColumnLayout } from './PickDateColumnLayout';
import { PickImageColumnLayout } from './PickImageColumnLayout';
import { pickRecordHeaderLayoutStyle } from './pickRecordHeader.css';
import { PickTagColumnLayout } from './PickTagColumnLayout';
import { PickTitleColumnLayout } from './PickTitleColumnLayout';
import { Separator } from './Separator';

export function PickRecordHeader() {
  return (
    <div className={pickRecordHeaderLayoutStyle}>
      <PickImageColumnLayout>
        <div style={{ lineHeight: '22px' }}>Image</div>
      </PickImageColumnLayout>

      <Separator />

      <PickTitleColumnLayout>
        <div style={{ lineHeight: '22px' }}>Title</div>
      </PickTitleColumnLayout>

      <Separator />
      <PickTagColumnLayout>
        <div style={{ lineHeight: '22px' }}>Tags</div>
      </PickTagColumnLayout>

      <Separator />

      <PickDateColumnLayout>
        <div style={{ lineHeight: '22px' }}>date</div>
      </PickDateColumnLayout>
    </div>
  );
}
