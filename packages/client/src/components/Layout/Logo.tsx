import { styled, useTheme } from '@material-ui/core/styles';
import { FC } from 'react';

const LogoImage = styled('img')(({ theme }) => ({
  ...theme.mixins.toolbar,
  width: '100%',
  padding: theme.spacing(0, 2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

const Logo: FC = () => {
  const theme = useTheme();
  const logo = theme.custom && theme.custom.logo;
  const logoAltText = theme.custom && theme.custom.logoAltText;

  return logo ? <LogoImage src={logo} alt={logoAltText} /> : null;
};

export default Logo;
