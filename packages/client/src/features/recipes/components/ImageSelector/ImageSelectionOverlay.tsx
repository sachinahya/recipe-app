import React, { FC } from 'react';

interface ImageSelectionOverlayProps {
  alwaysShown?: boolean;
}

const ImageSelectionOverlay: FC<ImageSelectionOverlayProps> = ({ alwaysShown, ...props }) => (
  <div
    css={{
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      transition: 'opacity 0.3s ease',
      pointerEvents: alwaysShown ? 'auto' : 'none',
      opacity: alwaysShown ? 1 : 0,

      '&:hover': {
        pointerEvents: 'auto',
        opacity: 1,
      },
    }}
    {...props}
  />
);

export default ImageSelectionOverlay;
