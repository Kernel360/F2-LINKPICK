import { PropsWithChildren, Suspense } from 'react';
import {
  FolderTree,
  FolderAndPickDndContextProvider,
  PickRecordHeader,
} from '@/components';
import { CreatePickPopover } from '@/components/CreatePickPopover/CreatePickPopover';
import { CurrentPathIndicator } from '@/components/FolderPathIndicator/CurrentPathIndicator';
import { Search } from '@/components/Search/Search';
import {
  pageContainerLayout,
  ListViewerLayout,
  ListViewerHeaderLayout,
  ListViewerHeaderMainLayout,
  ListViewerHeaderBodyLayout,
} from './layout.css';

export default function FolderLayout({ children }: PropsWithChildren) {
  return (
    <div className={pageContainerLayout}>
      <FolderAndPickDndContextProvider>
        <FolderTree />
        <div className={ListViewerLayout}>
          <div className={ListViewerHeaderLayout}>
            <div className={ListViewerHeaderMainLayout}>
              <Search />
              <CreatePickPopover />
            </div>
            <div className={ListViewerHeaderBodyLayout}>
              <Suspense>
                <CurrentPathIndicator />
              </Suspense>
            </div>
          </div>
          <PickRecordHeader />
          {children}
        </div>
      </FolderAndPickDndContextProvider>
    </div>
  );
}
