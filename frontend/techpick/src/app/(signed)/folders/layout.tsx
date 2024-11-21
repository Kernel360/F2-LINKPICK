import { PropsWithChildren, Suspense } from 'react';
import {
  FolderTree,
  FolderAndPickDndContextProvider,
  PickRecordHeader,
} from '@/components';
import { CurrentPathIndicator } from '@/components/FolderPathIndicator/CurrentPathIndicator';
import { SearchWidget } from '@/components/SearchWidget/SearchWidget';
import {
  pageContainerLayout,
  ListViewerLayout,
  ListViewerHeaderLayout,
  ListViewerHeaderMainLayout,
  ListViewerHeaderSubLayout,
} from './layout.css';

export default function FolderLayout({ children }: PropsWithChildren) {
  return (
    <div className={pageContainerLayout}>
      <FolderAndPickDndContextProvider>
        <FolderTree />
        <div className={ListViewerLayout}>
          <div className={ListViewerHeaderLayout}>
            <div className={ListViewerHeaderMainLayout}>
              <SearchWidget />
            </div>
            <div className={ListViewerHeaderSubLayout}>
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
