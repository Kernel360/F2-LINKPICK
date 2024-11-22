import { PropsWithChildren, Suspense } from 'react';
import Link from 'next/link';
import { MessageCircleWarning as MessageCircleWarningIcon } from 'lucide-react';
import { FolderTree, FolderAndPickDndContextProvider } from '@/components';
import { CreatePickPopover } from '@/components/CreatePickPopover/CreatePickPopover';
import { CurrentPathIndicator } from '@/components/FolderPathIndicator/CurrentPathIndicator';
import { Search } from '@/components/Search/Search';
import {
  pageContainerLayout,
  ListViewerLayout,
  ListViewerHeaderLayout,
  ListViewerHeaderMainLayout,
  ListViewerHeaderBodyLayout,
  qnaSection,
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

          {children}

          <Link
            href={encodeURIComponent(
              'https://docs.google.com/forms/d/e/1FAIpQLSfAWEFi1P1EEnhC8DzOWktqzef2vWifrA80sZBiwel6YVV6OA/viewform'
            )}
            target="_blank"
          >
            <div data-qna className={qnaSection}>
              <MessageCircleWarningIcon size={64} />
            </div>
          </Link>
        </div>
      </FolderAndPickDndContextProvider>
    </div>
  );
}
