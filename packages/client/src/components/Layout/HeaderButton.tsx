import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useDeviceSize } from 'styles/hooks';
import { spacing } from 'styles/styleSelectors';

interface HeaderButtonProps {
  variant?: 'back';
}

const buttonProps = {
  color: 'inherit',
  edge: 'start',
} as const;

const HeaderButton: FC<HeaderButtonProps> = ({ variant, ...props }) => {
  const { goBack } = useHistory();
  const isDesktop = useDeviceSize('desktop');

  if (variant === 'back') {
    return isDesktop ? null : (
      <IconButton
        css={theme => ({
          marginRight: spacing(1)(theme),
        })}
        aria-label="Back"
        onClick={() => goBack()}
        {...buttonProps}
        {...props}
      >
        <ArrowBackIcon />
      </IconButton>
    );
  }

  return null;
};

export default HeaderButton;
