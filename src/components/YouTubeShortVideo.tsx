import React, { IframeHTMLAttributes } from 'react';

const YouTubeShortVideo = ({
  id,
  ...rest
}: {
  id: string;
} & IframeHTMLAttributes<HTMLIFrameElement>) => {
  return (
    <iframe
      {...rest}
      width="315"
      height="560"
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope; picture-in-picture;web-share"
      allowFullScreen
    ></iframe>
  );
};

export default YouTubeShortVideo;
