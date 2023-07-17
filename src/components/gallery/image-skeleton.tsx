import React, { FC, HTMLProps } from 'react';

export const ImageSkeleton: FC<HTMLProps<HTMLImageElement>> = ({
  className,
}) => {
  return (
    <img
      src="/assets/images/placeholder.png"
      width={384}
      height={576}
      className={`animate-pulse ${className ?? ''}`}
    />
  );
};
