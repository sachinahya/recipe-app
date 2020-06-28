import MuiTabs, { TabsProps as MuiTabsProps } from '@material-ui/core/Tabs';
import React from 'react';

import { useTabsContext } from './TabsContext';

type TabsProps = Omit<MuiTabsProps, 'value'>;

const Tabs: React.FC<TabsProps> = ({ children, ...props }) => {
  const { enabled, current, setCurrent, getTablistProps } = useTabsContext();

  if (!enabled) return null;

  return (
    <MuiTabs
      value={current}
      onChange={(_, value) => setCurrent(value)}
      {...props}
      {...getTablistProps()}
    >
      {children}
    </MuiTabs>
  );
};

export default Tabs;
