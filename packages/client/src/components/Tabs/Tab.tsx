import MuiTab, { TabProps as MuiTabProps } from '@material-ui/core/Tab';
import React from 'react';
import { useTabsContext } from './TabsContext';

interface TabProps extends MuiTabProps {
  index: number;
}

const Tab: React.FC<TabProps> = ({ index, ...props }) => {
  const { getTabProps } = useTabsContext();
  return <MuiTab {...props} {...getTabProps(index)} />;
};

export default Tab;
