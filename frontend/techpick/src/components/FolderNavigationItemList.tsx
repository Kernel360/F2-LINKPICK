import { ROUTES } from '@/constants/route';
import { useGetActiveNavigationItemId } from '@/hooks/useGetActiveNavigationItemId';
import { useFetchFoldersWithBasicFolders } from '@/queries/useFetchFoldersWithBasicFolders';
import {
  ArchiveIcon,
  FolderClosedIcon,
  FolderOpenIcon,
  FolderUpIcon,
  Trash2Icon,
} from 'lucide-react';
import { NavigationItem } from './SideNavigationBar/NavigationItem';

export function FolderNavigationItemList({
  navigationItemClick = () => {},
}: FolderNavigationItemListProps) {
  const { data: folderList = [] } = useFetchFoldersWithBasicFolders();
  const { activeNavigationItemId } = useGetActiveNavigationItemId();

  return (
    <>
      {folderList.map((folderInfo) => {
        const isActive = folderInfo.id === activeNavigationItemId;
        const isShared = !!folderInfo?.folderAccessToken;
        let folderIcon = FolderClosedIcon;

        if (folderInfo.folderType === 'UNCLASSIFIED') {
          folderIcon = ArchiveIcon;
        } else if (folderInfo.folderType === 'RECYCLE_BIN') {
          folderIcon = Trash2Icon;
        } else if (isActive) {
          folderIcon = FolderOpenIcon;
        } else if (isShared) {
          folderIcon = FolderUpIcon;
        }

        return (
          <NavigationItem
            icon={folderIcon}
            key={folderInfo.id}
            href={ROUTES.FOLDER_DETAIL(folderInfo.id)}
            text={folderInfo.name}
            isActive={isActive}
            onClick={navigationItemClick}
          />
        );
      })}
    </>
  );
}

interface FolderNavigationItemListProps {
  navigationItemClick?: () => void;
}
