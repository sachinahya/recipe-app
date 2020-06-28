import React from 'react';
import styled from 'styled-components';
import { containerPadding } from 'styles/snippets';

import { useTabsContext } from './TabsContext';

interface TabPanelProps {
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, index, ...props }) => {
  const { getTabPanelProps } = useTabsContext();
  return (
    <div {...props} {...getTabPanelProps(index)}>
      {children}
    </div>
  );
};

export default styled(TabPanel)`
  ${containerPadding}
`;

/* const TabPanel = styled.div`
  background-color: ${props => props.theme.palette.background.default};
  padding: ${getSpacing(3)};
`; */
