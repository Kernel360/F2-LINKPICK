import { ROOT_FOLDER_ID } from '@/constants';
import { folderTreeHeaderLayout } from './folderTreeHeader.css';
import { ShowCreateFolderInputButton } from './ShowCreateFolderInputButton';

export function FolderTreeHeader() {
  return (
    <div className={folderTreeHeaderLayout}>
      <ShowCreateFolderInputButton newFolderParentId={ROOT_FOLDER_ID} />
    </div>
  );
}
