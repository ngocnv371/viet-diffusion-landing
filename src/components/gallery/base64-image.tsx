import React from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  base64: string;
};

const Base64Image = React.forwardRef<HTMLImageElement, Props>(
  ({ base64, ...rest }, ref) => {
    return <img ref={ref} src={base64} alt={rest.alt} {...rest} />;
  }
);

Base64Image.displayName = 'Base64Image';

export default Base64Image;
