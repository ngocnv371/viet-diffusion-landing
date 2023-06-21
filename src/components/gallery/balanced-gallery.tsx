import React, { FC, useMemo } from 'react';

import { UIElementData } from 'photoswipe/dist/types/ui/ui-element';
import { Gallery, Item } from 'react-photoswipe-gallery';

import LikedImage from './liked-image';
import 'photoswipe/dist/photoswipe.css';
import { ImageInfo } from './model';
import { distributeEvenHeightColumns, getCdnImage } from './util';

interface GalleryItemProps {
  image: ImageInfo;
  caption: (image: ImageInfo) => string;
}

const GalleryItem: FC<GalleryItemProps> = ({ image, caption }) => {
  const cdn = getCdnImage(image.cdnId);

  return (
    <Item
      key={image.id}
      original={image.base64 || cdn.publicUrl}
      thumbnail={image.base64 || cdn.smallUrl}
      width={image.width}
      height={image.height}
      caption={caption(image)}
    >
      {({ ref, open }) => (
        <LikedImage
          image={image}
          ref={ref as any}
          className="gallery-image"
          onClick={open}
          itemID={image.id.toString()}
          data-image={JSON.stringify(image)}
        />
      )}
    </Item>
  );
};

export interface BalancedGalleryProps {
  images: ImageInfo[];
  /**
   * specify the number of desired columns,
   * set to 0 to disable this and render a list
   */
  cols?: number;
  elements?: UIElementData[];
  caption?: (image: ImageInfo) => string;
}

const BalancedGallery: FC<BalancedGalleryProps> = ({
  images,
  cols = 2,
  elements = [],
  caption = () => '',
}) => {
  const columns = useMemo(
    () => (cols === 0 ? [] : distributeEvenHeightColumns(images, cols)),
    [images, cols]
  );

  return (
    <Gallery
      withCaption
      options={{ closeOnVerticalDrag: true }}
      uiElements={elements}
    >
      {cols === 0 &&
        images.map((i) => (
          <GalleryItem key={i.id} image={i} caption={caption} />
        ))}
      {cols > 0 &&
        columns.map((col, idx) => (
          <div key={idx} className="gallery-column">
            {col.map((i) => (
              <GalleryItem key={i.id} image={i} caption={caption} />
            ))}
          </div>
        ))}
    </Gallery>
  );
};

export default BalancedGallery;
