import React, { useEffect, useCallback } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { useSearchPickStore } from '@/stores/searchPickStore';

/**
 *
 * @TODO 렌더만 되는지 확인하려고 만든 컴포넌트
 * 실제로 windowing이 되는지 모름
 */

export function SearchInfiniteScrollList() {
  const {
    searchResultList,
    hasNext,
    isLoading,
    searchPicksByQueryParam,
    lastCursor,
    size,
    searchQuery,
    searchTag,
    searchFolder,
  } = useSearchPickStore();

  useEffect(() => {
    const fetchInitialData = async () => {
      await searchPicksByQueryParam();
    };

    fetchInitialData();
  }, [searchQuery, searchTag, searchFolder, searchPicksByQueryParam]);

  const loadMoreItems = useCallback(
    async (startIndex: number, stopIndex: number) => {
      if (hasNext && !isLoading) {
        const cursor = lastCursor;
        const fetchSize = size || stopIndex - startIndex + 1;
        await searchPicksByQueryParam(cursor, fetchSize);
      }
    },
    [searchPicksByQueryParam, hasNext, isLoading, lastCursor, size]
  );

  const isItemLoaded = (index: number) => {
    return !!searchResultList[index];
  };

  type ItemRendererProps = {
    index: number;
    style: React.CSSProperties;
  };

  const ItemRenderer = ({ index, style }: ItemRendererProps) => {
    const item = searchResultList[index];
    if (!item) {
      return (
        <div style={style} className="loading-item">
          Loading...
        </div>
      );
    }

    return (
      <div style={style} className="list-item">
        {item.title}
      </div>
    );
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={
              hasNext ? searchResultList.length + 1 : searchResultList.length
            }
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <List
                height={height}
                width={width}
                itemCount={searchResultList.length}
                itemSize={50}
                onItemsRendered={onItemsRendered}
                ref={ref}
                itemData={searchResultList}
              >
                {({ index, style }) => (
                  <ItemRenderer index={index} style={style} />
                )}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
}
