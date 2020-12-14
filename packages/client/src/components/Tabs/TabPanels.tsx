import { FC } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTabsContext } from './TabsContext';

const TabPanels: FC = ({ children }) => {
  const { enabled, current, setCurrent } = useTabsContext();

  if (!enabled) return <>{children}</>;

  return (
    <SwipeableViews
      axis="x"
      index={current}
      onChangeIndex={(index: number) => setCurrent(index)}
      css={{
        flexGrow: 1,

        '.react-swipeable-view-container': {
          height: '100%',
        },
      }}
    >
      {children}
    </SwipeableViews>
  );
};

export default TabPanels;
