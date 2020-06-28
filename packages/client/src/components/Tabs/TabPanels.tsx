import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';

import { useTabsContext } from './TabsContext';

const TabPanels: React.FC = ({ children }) => {
  const { enabled, current, setCurrent } = useTabsContext();

  if (!enabled) return <>{children}</>;

  return (
    <StyledSwipeableViews
      axis="x"
      index={current}
      onChangeIndex={(index: number) => setCurrent(index)}
    >
      {children}
    </StyledSwipeableViews>
  );
};

const StyledSwipeableViews = styled(SwipeableViews)`
  flex-grow: 1;

  .react-swipeable-view-container {
    height: 100%;

    & > div {
      /* overflow-x: hidden !important; */
    }
  }
`;

export default TabPanels;
