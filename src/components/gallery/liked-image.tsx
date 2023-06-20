import React from 'react';

import Base64Image from './base64-image';
import CdnImage from './cdn-image';
import { ImageInfo } from './model';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  image: ImageInfo;
  onLike: () => void;
};

const LikedImage = React.forwardRef<HTMLImageElement, Props>(
  ({ image, onLike, ...rest }, ref) => {
    return (
      <div className={`relative liked-image`}>
        {image.base64 ? (
          <Base64Image
            id={image.id.toString()}
            base64={image.base64}
            ref={ref as any}
            width={image.width}
            height={image.height}
            {...rest}
          />
        ) : (
          <CdnImage
            cdnId={image.cdnId}
            ref={ref as any}
            width={image.width}
            height={image.height}
            {...rest}
          />
        )}

        <div
          className="absolute top-1 right-1 rounded-xl bg-grey p-1 bg-[grey] bg-opacity-[0.4] control-box"
          onClick={onLike}
        >
          {image.likes_count > 0 && (
            <span className="text-white">{image.likes_count}</span>
          )}
          {image.liked ? '❤️' : '🤍'}
        </div>
      </div>
    );
  }
);

LikedImage.displayName = 'LikedImage';

export default LikedImage;
