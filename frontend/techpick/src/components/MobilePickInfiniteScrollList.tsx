import { useFetchPickListByFolderId } from '@/queries/useFetchPickListByFolderId';
import type { FolderIdType } from '@/types/FolderIdType';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { MobilePickRecord } from './MobilePickRecord';

export function MobilePickInfiniteScrollList({
  folderId,
}: MobilePickInfiniteScrollList) {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useFetchPickListByFolderId(folderId);
  const pickList = data?.pages.flatMap((page) => page.content) ?? [];
  const itemCount = hasNextPage ? pickList.length + 1 : pickList.length;

  const loadMoreItems = () => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const isItemLoaded = (index: number) => {
    return !hasNextPage || index < pickList.length;
  };

  return (
    <div style={{ height: 'calc(100vh - 64px)' }}>
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
                itemCount={pickList.length}
                itemSize={105.5}
                onItemsRendered={onItemsRendered}
                ref={ref}
                itemData={pickList}
              >
                {({ index, style }) => (
                  <div key={pickList[index].id} style={style}>
                    <MobilePickRecord pickInfo={pickList[index]} />
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

interface MobilePickInfiniteScrollList {
  folderId: FolderIdType;
}
