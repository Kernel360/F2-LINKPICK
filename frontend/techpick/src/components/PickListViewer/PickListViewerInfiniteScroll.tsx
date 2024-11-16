import { CSSProperties, ReactNode } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { PickRecord } from '@/components/PickListViewer/PickRecord';
import {
  pickRecordListLayoutStyle,
  RECORD_HEIGHT,
} from '@/components/PickListViewer/pickRecordListLayout.css';
import { usePickStore } from '@/stores';
import { PickListType } from '@/types';

const DO_NOTHING = () => {};

export interface PickListViwerInfiniteScrollProps {
  pickList: PickListType;
  loadNextSlice: () => void;
}

export function PickListViewerInfiniteScroll(
  props: PickListViwerInfiniteScrollProps
) {
  const { getSearchResult } = usePickStore();

  const itemCount = getSearchResult().hasNext
    ? props.pickList.length + 1
    : props.pickList.length;

  const loadMoreItems = getSearchResult().hasNext
    ? props.loadNextSlice
    : DO_NOTHING;

  const isItemLoaded = (index: number) => props.pickList[index] != undefined;

  const Item = ({
    index,
    style,
  }: {
    index: number;
    style: CSSProperties;
  }): ReactNode => {
    return (
      <div style={style}>
        {isItemLoaded(index) ? (
          <PickRecord pickInfo={props.pickList[index]} />
        ) : (
          <div>{'loading...'}</div> // TODO: use loading skeleton
        )}
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              style={pickRecordListLayoutStyle}
              onItemsRendered={onItemsRendered}
              itemSize={RECORD_HEIGHT}
              itemCount={itemCount}
              ref={ref}
              width={width}
              height={height}
            >
              {Item}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
}
