import { useFetchPickListByFolderId } from '@/queries/useFetchPickListByFolderId';
import type { FolderIdType } from '@/types/FolderIdType';
import dynamic from 'next/dynamic';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { MobilePickRecord } from './MobilePickRecord';
import {
  emptyPickListLayoutStyle,
  mobilePickInfiniteScrollListStyle,
} from './mobilePickInfiniteScrollList.css';
const EmptyPickRecordImage = dynamic(() =>
  import('@/components/EmptyPickRecordImage').then(
    (mod) => mod.EmptyPickRecordImage,
  ),
);

export function MobilePickInfiniteScrollList({
  folderId,
}: MobilePickInfiniteScrollList) {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
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

  if (!isLoading && pickList.length === 0) {
    return (
      <div className={mobilePickInfiniteScrollListStyle}>
        <div className={emptyPickListLayoutStyle}>
          <EmptyPickRecordImage description="" />
        </div>
      </div>
    );
  }

  return (
    <div className={mobilePickInfiniteScrollListStyle}>
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
