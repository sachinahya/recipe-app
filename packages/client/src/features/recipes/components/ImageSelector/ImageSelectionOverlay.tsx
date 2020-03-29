import React from 'react';
import styled, { css } from 'styled-components';

interface ImageSelectionOverlayProps {
  alwaysShown?: boolean;
}
export const ImageSelectionOverlay: React.FC<ImageSelectionOverlayProps> = ({
  children,
  alwaysShown,
  ...props
}) => {
  return <div {...props}>{children}</div>;
};

export default styled(ImageSelectionOverlay)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  background-color: transparent;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${props =>
    props.alwaysShown &&
    css`
      pointer-events: auto;
      opacity: 1;
    `}

  &:hover {
    pointer-events: auto;
    opacity: 1;
  }
`;
