import { StyledProps } from 'styled-components';

export type StyleSelector = ({ theme }: StyledProps<Record<string, unknown>>) => string;

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
