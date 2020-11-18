import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';
import { FC } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

type LinkProps = MuiLinkProps & RouterLinkProps;

const Link: FC<LinkProps> = ({ children, to, ...props }) => {
  return (
    <MuiLink component={RouterLink} to={to} {...props}>
      {children}
    </MuiLink>
  );
};

export default Link;
