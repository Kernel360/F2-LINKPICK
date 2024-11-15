import { Gap, DeferredComponent } from '@/libs/@components';
import { useGetTabInfo } from '@/libs/@chrome/useGetTabInfo';
import { useHasPick } from '@/hooks';
import { BookmarkHeader } from './BookmarkHeader';
import { SkeltonPickForm, CreatePickForm, UpdatePickForm } from '@/components';
import { bookmarkPageLayout } from './BookmarkPage.css';
import { useTagStore } from '@/stores';

export function BookmarkPage() {
  const {
    ogImage: imageUrl,
    title,
    url,
    ogDescription: description,
  } = useGetTabInfo();
  const { isLoading, hasLink, data: pickData } = useHasPick(url);
  const tagList = useTagStore((state) => state.tagList);
  const selectedTagInfoList = pickData
    ? tagList.filter((tag) => pickData.tagIdOrderedList.includes(tag.id))
    : [];

  if (isLoading) {
    return (
      <div className={bookmarkPageLayout}>
        <BookmarkHeader />
        <Gap verticalSize="gap24" />
        <DeferredComponent>
          <SkeltonPickForm />
        </DeferredComponent>
      </div>
    );
  }

  return (
    <div className={bookmarkPageLayout}>
      <BookmarkHeader />
      <Gap verticalSize="gap24" />
      {hasLink ? (
        <UpdatePickForm
          id={pickData.id}
          title={pickData.title}
          tagList={selectedTagInfoList}
          imageUrl={imageUrl}
        />
      ) : (
        <CreatePickForm
          title={title}
          url={url}
          imageUrl={imageUrl}
          description={description}
        />
      )}
    </div>
  );
}
