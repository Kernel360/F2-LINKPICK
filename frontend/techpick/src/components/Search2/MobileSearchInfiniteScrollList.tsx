import { useFetchSearchPickList } from '@/queries/useFetchSearchPickList';
import { useSearchPickStore } from '@/stores/searchPickStore';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { MobilePickRecord } from '../MobilePickRecord';
import { mobileSearchInfiniteScrollList } from './mobileSearchInfiniteScrollList.css';

/**
 * 기능적으로 SearchInfiniteScrollList와 동일하지만,
 *
 * 클릭 시에 해당 페이지로 스크롤 하는 것이 아니라 곧바로 해당 링크로 이동하도록 변경됐습니다.
 *
 */
export function MobileSearchInfiniteScrollList() {
  const { searchQuery, searchTag, searchFolder } = useSearchPickStore();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchSearchPickList({
      searchTokenList: encodeURIComponent(searchQuery),
      folderIdList: searchFolder,
      tagIdList: searchTag,
    });

  const searchResultList = data?.pages.flatMap((page) => page.content) ?? [];
  const itemCount = hasNextPage
    ? searchResultList.length + 1
    : searchResultList.length;

  const loadMoreItems = () => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const isItemLoaded = (index: number) => {
    return !hasNextPage || index < searchResultList.length;
  };

  return (
    <div className={mobileSearchInfiniteScrollList}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
            threshold={5}
          >
            {({ onItemsRendered, ref }) => (
              <List
                height={height}
                width={width}
                itemCount={searchResultList.length}
                itemSize={105.5}
                onItemsRendered={onItemsRendered}
                ref={ref}
                itemData={searchResultList}
              >
                {({ index, style }) => (
                  <div key={searchResultList[index].id} style={style}>
                    <MobilePickRecord pickInfo={searchResultList[index]} />
                  </div>
                )}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
}
