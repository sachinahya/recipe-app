import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { ComponentType } from 'react';

export interface NavigationLink {
  to: string;
  text: string;
  icon?: ComponentType<SvgIconProps>;
}

export interface NavigationProps {
  links?: NavigationLink[];
}
