import { DeferredComponent } from '@/libs/@components';
import { useGetTabInfo } from '@/libs/@chrome/useGetTabInfo';
import { useHasPick } from '@/hooks';
import { SkeltonPickForm, CreatePickForm, UpdatePickForm } from '@/components';
import { bookmarkPageLayout } from './BookmarkPage.css';
import { useEffect, useRef, useState } from 'react';
import { FolderType } from '@/types';
import { getBasicFolderList, getRootFolderChildFolders } from '@/apis';
import { useTagStore } from '@/stores';

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
  const [isFolderInfoListLoading, setIsFolderInfoListLoading] = useState(true);
  const [folderInfoList, setFolderInfoList] = useState<FolderType[]>([]);
  const replaceSelectedTagList = useTagStore(
    (state) => state.replaceSelectedTagList
  );
  const tagList = useTagStore((state) => state.tagList);
  const { fetchingTagList } = useTagStore();
  const isInitialLoadRef = useRef(true);

  useEffect(function onBookmarkPageLoad() {
    const fetchFolderInfoList = async () => {
      const folderInfoList: FolderType[] = [];

      const basicFolders = await getBasicFolderList();
      const rootFolderChildFolders = await getRootFolderChildFolders();

      for (const folderInfo of rootFolderChildFolders) {
        if (
          folderInfo.folderType !== 'ROOT' &&
          folderInfo.folderType !== 'RECYCLE_BIN'
        ) {
          folderInfoList.push(folderInfo);
        }
      }

      for (const folderInfo of basicFolders) {
        if (
          folderInfo.folderType !== 'ROOT' &&
          folderInfo.folderType !== 'RECYCLE_BIN'
        ) {
          folderInfoList.push(folderInfo);
        }
      }

      folderInfoList.sort((a, b) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });

      setFolderInfoList(folderInfoList);
      setIsFolderInfoListLoading(false);
    };

    fetchFolderInfoList();
  }, []);

  useEffect(
    function onUpdatePickFormLoad() {
      if (pickData && isInitialLoadRef.current && 0 < tagList.length) {
        isInitialLoadRef.current = false;
        const initialData = pickData?.tagIdOrderedList
          ? tagList.filter((tag) => pickData.tagIdOrderedList.includes(tag.id))
          : [];

        replaceSelectedTagList(initialData);
      }
    },
    [pickData, replaceSelectedTagList, tagList]
  );

  useEffect(
    function fetchTagList() {
      fetchingTagList();
    },
    [fetchingTagList]
  );

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
