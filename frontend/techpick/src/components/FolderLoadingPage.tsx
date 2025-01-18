import { FolderContentHeader } from './FolderContentHeader/FolderContentHeader';
import { FolderContentLayout } from './FolderContentLayout';
import { PickContentLayout } from './PickContentLayout';
import { PickRecordHeader } from './PickRecord/PickRecordHeader';

export function FolderLoadingPage() {
  return (
    <FolderContentLayout>
      <FolderContentHeader />
      <PickContentLayout>
        <PickRecordHeader />
      </PickContentLayout>
    </FolderContentLayout>
  );
}
