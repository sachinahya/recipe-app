import { SvgIconProps } from '@material-ui/core/SvgIcon';

export interface NavigationLink {
  to: string;
  text: string;
  icon?: React.ComponentType<SvgIconProps>;
}

export interface NavigationProps {
  links?: NavigationLink[];
}
