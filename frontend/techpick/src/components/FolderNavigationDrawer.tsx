import { ROUTES } from '@/constants/route';
import { useGetActiveNavigationItemId } from '@/hooks/useGetActiveNavigationItemId';
import { useFetchFoldersWithBasicFolders } from '@/queries/useFetchFoldersWithBasicFolders';
import {
  contentScrollableSectionStyle,
  drawerContentInnerStyle,
  drawerHandleStyle,
  drawerOverlayStyle,
} from '@/styles/drawerStyle.css';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import {
  ArchiveIcon,
  FolderClosedIcon,
  FolderOpenIcon,
  FolderUpIcon,
  StarIcon,
  Trash2Icon,
} from 'lucide-react';
import { Drawer } from 'vaul';
import { NavigationItem } from './SideNavigationBar/NavigationItem';
import { contentStyle } from './folderNavigationDrawer.css';

export function FolderNavigationDrawer({
  isOpen,
  onOpenChange,
}: FolderNavigationDrawerProps) {
  const { data: folderList = [] } = useFetchFoldersWithBasicFolders();
  const { activeNavigationItemId } = useGetActiveNavigationItemId();

  return (
    <Drawer.Root open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className={drawerOverlayStyle} />
        <Drawer.Content className={contentStyle}>
          <div className={drawerContentInnerStyle}>
            <div className={contentScrollableSectionStyle}>
              <div aria-hidden className={drawerHandleStyle} />
              <VisuallyHidden.Root>
                <Drawer.Title>폴더 네이게이션 바</Drawer.Title>
                <Drawer.Description>
                  이동하고 싶은 곳을 선택하세요
                </Drawer.Description>
              </VisuallyHidden.Root>

              <NavigationItem
                icon={StarIcon}
                href={ROUTES.RECOMMEND}
                text={'추천'}
                isActive={activeNavigationItemId === 'recommend'}
                onClick={() => {
                  onOpenChange(false);
                }}
              />

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
                    onClick={() => {
                      onOpenChange(false);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

interface FolderNavigationDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
