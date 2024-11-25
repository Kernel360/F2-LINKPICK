import { PropsWithChildren, Suspense } from 'react';
import { MessageCircleWarning as MessageCircleWarningIcon } from 'lucide-react';
import { FolderTree, FolderAndPickDndContextProvider } from '@/components';
import { CurrentPathIndicator } from '@/components/FolderPathIndicator/CurrentPathIndicator';
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
              <Suspense>
                <CurrentPathIndicator />
              </Suspense>
            </div>
            <div className={ListViewerHeaderBodyLayout}></div>
          </div>
          {children}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfAWEFi1P1EEnhC8DzOWktqzef2vWifrA80sZBiwel6YVV6OA/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div data-qna className={qnaSection}>
              <MessageCircleWarningIcon size={64} />
            </div>
          </a>
        </div>
      </FolderAndPickDndContextProvider>
    </div>
  );
}
