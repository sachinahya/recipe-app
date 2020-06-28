import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useDeviceSize } from 'styles/hooks';
import { getSpacing } from 'styles/styleSelectors';

interface HeaderButtonProps {
  variant?: 'back';
}

const buttonProps = {
  color: 'inherit',
  edge: 'start',
} as const;

const HeaderButton: React.FC<HeaderButtonProps> = ({ variant, ...props }) => {
  const { goBack } = useHistory();
  const isDesktop = useDeviceSize('desktop');

  if (variant === 'back') {
    return isDesktop ? null : (
      <IconButton aria-label="Back" onClick={() => goBack()} {...buttonProps} {...props}>
        <ArrowBackIcon />
      </IconButton>
    );
  }

  return null;

  /* return drawerPermanent ? null : (
    <IconButton aria-label="Open drawer" onClick={openDrawer} {...buttonProps} {...props}>
      <MenuIcon />
    </IconButton>
  ); */
};

export default styled(HeaderButton)`
  margin-right: ${getSpacing(1)};
`;
