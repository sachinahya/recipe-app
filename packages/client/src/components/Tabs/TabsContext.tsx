import { makeContextConsumerHook } from '@sachinahya/utils';
import React from 'react';

import { useTabs, UseTabsHook, UseTabsOptions } from './useTabs';

const TabsContext = React.createContext<UseTabsHook>({
  enabled: false,
} as UseTabsHook);

export const TabsProvider: React.FC<UseTabsOptions> = ({ children, ...props }) => {
  const tabs = useTabs(props);
  return <TabsContext.Provider value={tabs}>{children}</TabsContext.Provider>;
};

export const useTabsContext = makeContextConsumerHook(TabsContext);
