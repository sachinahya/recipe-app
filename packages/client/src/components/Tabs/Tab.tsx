import MuiTab, { TabProps as MuiTabProps } from '@material-ui/core/Tab';
import { FC } from 'react';

import { useTabsContext } from './TabsContext';

interface TabProps extends MuiTabProps {
  index: number;
}

const Tab: FC<TabProps> = ({ index, ...props }) => {
  const { getTabProps } = useTabsContext();
  return <MuiTab {...props} {...(getTabProps(index) as unknown)} />;
};

export default Tab;
