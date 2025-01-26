import { UNKNOWN_FOLDER_ID } from '@/constants/unknownFolderId';
import { FolderContentHeader } from './FolderContentHeader/FolderContentHeader';
import { FolderContentLayout } from './FolderContentLayout';
import { PickContentLayout } from './PickContentLayout';
import { PickRecordHeader } from './PickRecord/PickRecordHeader';

export function FolderLoadingPage() {
  return (
    <FolderContentLayout>
      <FolderContentHeader folderId={UNKNOWN_FOLDER_ID} />
      <PickContentLayout>
        <PickRecordHeader />
      </PickContentLayout>
    </FolderContentLayout>
  );
}
