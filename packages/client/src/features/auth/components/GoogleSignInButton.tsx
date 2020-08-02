import { Button, ButtonProps } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';

import GoogleLogo from './Google.svg';

interface GoogleSignInButtonProps extends ButtonProps {}

const StyledLogo = styled(GoogleLogo)`
  width: 18px;
  height: 18px;
  margin-right: ${getSpacing(2)};
`;

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = props => {
  return (
    <Button {...props}>
      <StyledLogo />
      Sign in with Google
    </Button>
  );
};

export default styled(GoogleSignInButton)`
  align-self: center;
`;
