import React from 'react';

import { getCdnImage } from './util';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & { cdnId: string };

const CdnImage = React.forwardRef<HTMLImageElement, Props>(
  ({ cdnId, ...rest }, ref) => {
    const cdn = getCdnImage(cdnId);
    const { sizes, srcset, smallUrl } = cdn;

    return (
      <img
        data-cdn={cdnId}
        ref={ref}
        sizes={sizes}
        srcSet={srcset}
        src={smallUrl}
        alt={cdnId}
        {...rest}
      />
    );
  }
);

CdnImage.displayName = 'CdnImage';

export default CdnImage;
