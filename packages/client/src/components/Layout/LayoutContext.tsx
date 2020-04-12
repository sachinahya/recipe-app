import { makeContextConsumerHook } from '@sachinahya/utils';
import useNavigation from 'components/Navigation/useNavigation';
import React from 'react';
import { useDeviceSize } from 'styles/hooks';

export interface LayoutState {
  drawerOpen: boolean;
  drawerPermanent: boolean;
  bottomNavVisible: boolean;
}

export type LayoutContextType = LayoutState & {
  openDrawer(): void;
  closeDrawer(): void;
};

const LayoutContext = React.createContext<LayoutContextType | undefined>(undefined);

export const useLayout = makeContextConsumerHook(LayoutContext);

export const LayoutProvider: React.FC = ({ children }) => {
  const isDesktop = useDeviceSize('desktop');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { pathLength } = useNavigation();
  const showBottomNav = pathLength <= 1;

  const bottomNavVisible = showBottomNav && !isDesktop;
  const drawerPermanent = isDesktop;
  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const value = React.useMemo(() => {
    return {
      drawerOpen,
      openDrawer,
      closeDrawer,
      drawerPermanent,
      bottomNavVisible,
    };
  }, [bottomNavVisible, drawerOpen, drawerPermanent]);

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};
