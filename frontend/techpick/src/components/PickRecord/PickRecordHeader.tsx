'use client';

import { usePathname } from 'next/navigation';
import { isCurrentPathRootOrGeneral } from '@/utils/isCurrentPathRootOrGeneral';
import { PickDateColumnLayout } from './PickDateColumnLayout';
import { PickImageColumnLayout } from './PickImageColumnLayout';
import { pickRecordHeaderLayoutStyle } from './pickRecordHeader.css';
import { PickTagColumnLayout } from './PickTagColumnLayout';
import { PickTitleColumnLayout } from './PickTitleColumnLayout';
import { Separator } from './Separator';

export function PickRecordHeader() {
  return !isCurrentPathRootOrGeneral(usePathname()) ? (
    <>{/* do not show record header */} </>
  ) : (
    <div className={pickRecordHeaderLayoutStyle}>
      <PickImageColumnLayout>
        <div style={{ width: '48px' }}>Image</div>
      </PickImageColumnLayout>

      <Separator />

      <PickTitleColumnLayout>
        <div style={{ width: '520px' }}>Title</div>
      </PickTitleColumnLayout>

      <Separator />
      <PickTagColumnLayout>
        <div style={{ width: '320px' }}>Tags</div>
      </PickTagColumnLayout>

      <Separator />

      <PickDateColumnLayout>
        <div>date</div>
      </PickDateColumnLayout>
    </div>
  );
}
