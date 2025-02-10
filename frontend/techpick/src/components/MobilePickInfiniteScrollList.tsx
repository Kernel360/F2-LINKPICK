import { useFetchPickListByFolderId } from '@/queries/useFetchPickListByFolderId';
import type { FolderIdType } from '@/types/FolderIdType';
import { SquirrelIcon } from 'lucide-react';
import { useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { MobilePickRecord } from './MobilePickRecord';
import { PullToRefreshContainer } from './PullToRefreshContainer';
import {
  emptyPickListLayoutStyle,
  mobilePickInfiniteScrollListStyle,
} from './mobilePickInfiniteScrollList.css';

export function MobilePickInfiniteScrollList({
  folderId,
}: MobilePickInfiniteScrollList) {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    refetch,
  } = useFetchPickListByFolderId(folderId);
  const pickList = data?.pages.flatMap((page) => page.content) ?? [];
  const itemCount = hasNextPage ? pickList.length + 1 : pickList.length;
  const [isDisabled, setIsDisable] = useState(false);

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
          <SquirrelIcon size={'50vw'} />
          <div>
            <p>북마크 대신 귀여운 다람쥐가 있네요! </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PullToRefreshContainer
      isDisabled={isDisabled}
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div>
        <div className={mobilePickInfiniteScrollListStyle}>
          <AutoSizer>
            {({ height, width }) => (
              <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={itemCount}
                loadMoreItems={loadMoreItems}
                threshold={10}
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
                    onScroll={(e) => {
                      setIsDisable(e.scrollOffset !== 0);
                    }}
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
      </div>
    </PullToRefreshContainer>
  );
}

interface MobilePickInfiniteScrollList {
  folderId: FolderIdType;
}
