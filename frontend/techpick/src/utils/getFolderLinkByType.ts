import { ROUTES } from '@/constants/route';
import type { FolderType } from '@/types/FolderType';

export const getFolderLinkByType = (folder: FolderType) => {
  switch (folder.folderType) {
    case 'ROOT': {
      return '';
    }
    case 'UNCLASSIFIED': {
      return ROUTES.FOLDERS_UNCLASSIFIED;
    }
    case 'RECYCLE_BIN': {
      return ROUTES.FOLDERS_RECYCLE_BIN;
    }
    case 'GENERAL': {
      return ROUTES.FOLDER_DETAIL(folder.id);
    }
    default: {
      return '';
    }
  }
};
