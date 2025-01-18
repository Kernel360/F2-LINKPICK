import { createPickToUnclassifiedFolder } from '@/apis/createPickToUnclassifiedFolder';
import { getBasicFolderList } from '@/apis/getBasicFolders';
import { getRootFolderChildFolders } from '@/apis/getRootFolderChildFolders';
import { getTagList } from '@/apis/getTagList';
import { SkeltonPickForm } from '@/components/SkeltonPickForm';
import { UpdatePickForm } from '@/components/UpdatePickForm';
import { CHANGE_ICON_PORT_NAME } from '@/constants/changeIconPortName';
import { useEventLogger } from '@/hooks/useEventLogger';
import { getCurrentTabInfo } from '@/libs/@chrome/getCurrentTabInfo';
import { DeferredComponent } from '@/libs/@components/DeferredComponent';
import { notifyError } from '@/libs/@toast/notifyError';
import { useTagStore } from '@/stores/tagStore';
import type { CreatePickToUnclassifiedFolderResponseType } from '@/types/CreatePickToUnclassifiedFolderResponseType';
import type { FolderType } from '@/types/FolderType';
import { filterSelectableFolder } from '@/utils/filterSelectableFolderList';
import { useEffect, useRef, useState } from 'react';
import { bookmarkPageLayout } from './BookmarkPage.css';

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

        if (
          !title ||
          !url ||
          !favIconUrl ||
          url.trim() === '' ||
          !url.startsWith('http')
        ) {
          notifyError('해당 url은 저장할 수 없습니다.');
          return;
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
          rootFolderChildFolderList,
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
    [setTagList, trackSaveBookmark],
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
