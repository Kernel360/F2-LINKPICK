import { DeferredComponent } from '@/libs/@components';
import { useGetTabInfo } from '@/libs/@chrome/useGetTabInfo';
import { useHasPick } from '@/hooks';
import { SkeltonPickForm, CreatePickForm, UpdatePickForm } from '@/components';
import { bookmarkPageLayout } from './BookmarkPage.css';
import { useTagStore } from '@/stores';
import { useEffect, useState } from 'react';
import { FolderType } from '@/types';
import { getBasicFolderList, getRootFolderChildFolders } from '@/apis';

export function BookmarkPage() {
  const {
    ogImage: imageUrl,
    title,
    url,
    ogDescription: description,
  } = useGetTabInfo();
  const {
    isLoading: isGetPickInfoLoading,
    hasLink,
    data: pickData,
  } = useHasPick(url);
  const tagList = useTagStore((state) => state.tagList);
  const selectedTagInfoList = pickData
    ? tagList.filter((tag) => pickData.tagIdOrderedList.includes(tag.id))
    : [];
  const [isFolderInfoListLoading, setIsFolderInfoListLoading] = useState(true);
  const [folderInfoList, setFolderInfoList] = useState<FolderType[]>([]);

  useEffect(function onBookmarkPageLoad() {
    const getFolderInfoList = async () => {
      const folderInfoList: FolderType[] = [];

      const basicFolders = await getBasicFolderList();
      const rootFolderChildFolders = await getRootFolderChildFolders();

      for (const folderInfo of rootFolderChildFolders) {
        if (folderInfo.folderType !== 'ROOT') {
          folderInfoList.push(folderInfo);
        }
      }

      for (const folderInfo of basicFolders) {
        if (folderInfo.folderType !== 'ROOT') {
          folderInfoList.push(folderInfo);
        }
      }

      setFolderInfoList(folderInfoList);
      setIsFolderInfoListLoading(false);
    };

    getFolderInfoList();
  }, []);

  if (isGetPickInfoLoading || isFolderInfoListLoading) {
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
      {hasLink ? (
        <UpdatePickForm
          id={pickData.id}
          title={pickData.title}
          tagList={selectedTagInfoList}
          imageUrl={imageUrl}
          folderId={pickData.parentFolderId}
          folderInfoList={folderInfoList}
        />
      ) : (
        <CreatePickForm
          title={title}
          url={url}
          imageUrl={imageUrl}
          description={description}
          folderInfoList={folderInfoList}
        />
      )}
    </div>
  );
}
