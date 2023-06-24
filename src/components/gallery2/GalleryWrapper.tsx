import React, { useRef, useEffect } from 'react';

import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

interface Props {
  // Are there more items to load?
  // (This information comes from the most recent API request.)
  hasNextPage: boolean;

  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  isNextPageLoading: boolean;

  // Array of items loaded so far.
  items: any[];

  // Callback function responsible for loading the next page of items.
  loadNextPage: (startIndex: number, stopIndex: number) => Promise<void> | void;

  sortOrder: string;
}

export default function GalleryWrapper({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
  sortOrder,
}: Props) {
  // We create a reference for the InfiniteLoader
  const listRef = useRef<InfiniteLoader>(null);
  const hasMountedRef = useRef(false);

  // Each time the sort prop changed we called the method resetloadMoreItemsCache to clear the cache
  useEffect(() => {
    if (listRef.current && hasMountedRef.current) {
      listRef.current.resetloadMoreItemsCache();
    }
    hasMountedRef.current = true;
  }, [sortOrder]);

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

  // Render an item or a loading indicator.
  const Item = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    let content;
    if (!isItemLoaded(index)) {
      content = 'Loading...';
    } else {
      content = items[index].name;
    }

    return <div style={style}>{content}</div>;
  };

  // We passed down the ref to the InfiniteLoader component
  return (
    <InfiniteLoader
      ref={listRef}
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          className="List"
          height={150}
          itemCount={itemCount}
          itemSize={30}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width={300}
        >
          {Item}
        </List>
      )}
    </InfiniteLoader>
  );
}
