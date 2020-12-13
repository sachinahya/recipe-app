import { FC } from 'react';
import { containerPadding } from 'styles/snippets';
import { useTabsContext } from './TabsContext';

interface TabPanelProps {
  index: number;
}

const TabPanel: FC<TabPanelProps> = ({ children, index, ...props }) => {
  const { getTabPanelProps } = useTabsContext();
  return (
    <div css={containerPadding} {...props} {...getTabPanelProps(index)}>
      {children}
    </div>
  );
};

export default TabPanel;
