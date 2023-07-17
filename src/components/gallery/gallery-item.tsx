import React, { FC } from 'react';

import { Item } from 'react-photoswipe-gallery';

import LikedImage from './liked-image';
import 'photoswipe/dist/photoswipe.css';
import { ImageInfo } from './model';
import { getCdnImage } from './util';

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
          className="object-cover w-full h-full"
          style={{ aspectRatio: `${image.width}/${image.height}` }}
          onClick={open}
          itemID={image.id.toString()}
          data-image={JSON.stringify(image)}
        />
      )}
    </Item>
  );
};

export default GalleryItem;
