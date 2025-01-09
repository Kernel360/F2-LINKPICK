import { DeferredComponent } from '@/libs/@components';
import { SkeltonPickForm, UpdatePickForm } from '@/components';
import { bookmarkPageLayout } from './BookmarkPage.css';
import { useEffect, useRef, useState } from 'react';
import { FolderType } from '@/types';
import {
  createPickToUnclassifiedFolder,
  getBasicFolderList,
  getRootFolderChildFolders,
  getTagList,
} from '@/apis';
import { useTagStore } from '@/stores';
import { getCurrentTabInfo } from '@/libs/@chrome/getCurrentTabInfo';
import { filterSelectableFolder } from '@/utils';
import type { CreatePickToUnclassifiedFolderResponseType } from '@/types';
import { CHANGE_ICON_PORT_NAME } from '@/constants';
import { useEventLogger } from '@/hooks/useEventLogger';

export function BookmarkPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [folderInfoList, setFolderInfoList] = useState<FolderType[]>([]);
  const [pickInfo, setPickInfo] =
    useState<CreatePickToUnclassifiedFolderResponseType>();
  const [imageUrl, setImageUrl] = useState('');
  const isFetched = useRef(false);
  const setTagList = useTagStore((state) => state.setTagList);
  const { trackEvent: trackSaveBookmark } = useEventLogger({
    eventName: 'extension_save_bookmark',
  });

  useEffect(
    function onLoad() {
      const fetchInitialData = async () => {
        const { title, url, favIconUrl } = await getCurrentTabInfo();

        if (!title || !url || !favIconUrl) {
          throw new Error('getCurrentTabInfo failed');
        }

        const slicedTitle = title.slice(0, 255);
        chrome.runtime.connect({ name: CHANGE_ICON_PORT_NAME });

        const [
          fetchedTagList,
          basicFolderList,
          rootFolderChildFolderList,
          createdPickInfo,
        ] = await Promise.all([
          getTagList(),
          getBasicFolderList(),
          getRootFolderChildFolders(),
          createPickToUnclassifiedFolder({ title: slicedTitle, url }),
        ]);

        const filteredFolderInfoList = filterSelectableFolder(
          basicFolderList,
          rootFolderChildFolderList
        );

        trackSaveBookmark();
        setFolderInfoList([...filteredFolderInfoList]);
        setTagList(fetchedTagList);
        setPickInfo(createdPickInfo);
        setImageUrl(favIconUrl);
        setIsLoading(false);
      };

      if (!isFetched.current) {
        isFetched.current = true;
        fetchInitialData();
      }
    },
    [setTagList]
  );

  if (isLoading || !pickInfo) {
    return (
      <div className={bookmarkPageLayout}>
        <DeferredComponent>
          <SkeltonPickForm />
        </DeferredComponent>
      </div>
    );
  }

  return (
    <div className={bookmarkPageLayout}>
      <UpdatePickForm
        id={pickInfo.id}
        title={pickInfo.title}
        imageUrl={imageUrl}
        folderId={pickInfo.parentFolderId}
        folderInfoList={folderInfoList}
      />
    </div>
  );
}
