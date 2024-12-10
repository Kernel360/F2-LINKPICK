import React, { useEffect, useCallback } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { useSearchPickStore } from '@/stores/searchPickStore';
import * as styles from './searchInfiniteScrollList.css';
import SearchItemRenderer from './SearchItemRenderer';

export function SearchInfiniteScrollList({
  onClose,
}: SearchInfiniteScrollListProps) {
  const {
    searchResultList,
    hasNext,
    isLoading,
    searchPicksByQueryParam,
    loadMoreSearchPicks,
    lastCursor,
    searchQuery,
    searchTag,
    searchFolder,
  } = useSearchPickStore();

  useEffect(() => {
    if (!searchResultList.length) searchPicksByQueryParam();
  }, [searchQuery, searchTag, searchFolder, searchResultList]);

  const loadMoreItems = useCallback(async () => {
    loadMoreSearchPicks();
  }, [hasNext, isLoading, lastCursor]);

  const isItemLoaded = (index: number) => {
    return !hasNext || index < searchResultList.length;
  };

  return (
    <div className={styles.searchListContainer}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={
              hasNext ? searchResultList.length + 1 : searchResultList.length
            }
            loadMoreItems={loadMoreItems}
            threshold={5}
          >
            {({ onItemsRendered, ref }) => (
              <List
                height={height}
                width={width}
                itemCount={searchResultList.length}
                itemSize={60}
                onItemsRendered={onItemsRendered}
                ref={ref}
                itemData={searchResultList}
              >
                {({ index, style }) => (
                  <SearchItemRenderer
                    index={index}
                    item={searchResultList[index]}
                    style={style}
                    onClose={onClose}
                  />
                )}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
}

interface SearchInfiniteScrollListProps {
  onClose: () => void;
}
