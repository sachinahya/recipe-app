import { LayoutContextType } from 'components/Layout';
import { css,DefaultTheme, StyledProps } from 'styled-components';

export type StyleSelector = ({ theme }: StyledProps<{}>) => string;

const defaultDrawerWidth = 240;

export const getSpacing = (s: number): StyleSelector => ({ theme }) => {
  return `${theme.spacing(s)}px`;
};

export const getDrawerWidth: StyleSelector = ({ theme }) => {
  return `${theme.custom?.drawerWidth || defaultDrawerWidth}px`;
};

export const getBorderRadius: StyleSelector = ({ theme }) => {
  return `${theme.shape.borderRadius}px`;
};

export const getClearDrawer = (props: StyledProps<LayoutContextType>) => {
  return (
    props.drawerPermanent &&
    css`
      width: calc(100% - ${getDrawerWidth});
    `
  );
};

export const getClearHeaderStyles = (theme: DefaultTheme) => {
  return {
    '&::before': {
      ...theme.mixins.toolbar,
      content: '""',
      display: 'block',
    },
  };
};
