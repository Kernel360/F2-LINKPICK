import { ROUTES } from '@/constants/route';
import type { FolderType } from '@/types/FolderType';

export const getFolderLinkByType = (folder: FolderType) => {
  switch (folder.folderType) {
    case 'ROOT': {
      return '';
    }
    case 'GENERAL': {
      return ROUTES.FOLDER_DETAIL(folder.id);
    }
    default: {
      return '';
    }
  }
};
