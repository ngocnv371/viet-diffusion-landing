import React, { FC } from 'react';

import { toast } from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';

import BalancedGallery from './balanced-gallery';
import { useCommunityImages, useWindowWidth } from './hooks';
import { ImageSkeleton } from './image-skeleton';
import { Image } from './model';

export const ImageList: FC = () => {
  const [state, getMore] = useCommunityImages((msg) => toast(msg));
  const items = state.items as Image[];
  const { loading } = state;
  const width = useWindowWidth();
  const COL_WIDTH = 285;
  const cols = Math.min(8, Math.ceil(width / COL_WIDTH));

  return (
    <InfiniteScroll
      scrollableTarget="scroll-container"
      dataLength={state.items.length}
      hasMore={state.hasMore}
      next={getMore}
      loader={null}
    >
      <div className="hidden grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8">
        Use this block to force rendering the dynamic grid-cols, otherwise the
        css class wont get generated
      </div>
      <div className={`grid grid-cols-${cols}`}>
        <BalancedGallery
          images={state.items as any}
          elements={[]}
          cols={cols}
          onLike={() => Promise.resolve()}
          caption={(i) =>
            [
              i.prompt,
              // i.styleId && `<span class='style-caption'>${i.styleId}</span>`,
            ]
              .filter(Boolean)
              .join('\n')
          }
        />
        {!loading && !items.length && (
          <div className="m-4">
            <span className="m-4">Không có dữ liệu</span>
          </div>
        )}
        {loading &&
          [...new Array(6)].map((_, i) => (
            <ImageSkeleton className="pr-[1px] pb-[1px]" key={i} />
          ))}
      </div>
    </InfiniteScroll>
  );
};
