import { makeContextConsumerHook } from '@sachinahya/utils';
import { createContext, FC } from 'react';

import { useTabs, UseTabsHook, UseTabsOptions } from './useTabs';

const TabsContext = createContext<UseTabsHook>({
  enabled: false,
} as UseTabsHook);

export const TabsProvider: FC<UseTabsOptions> = ({ children, ...props }) => {
  const tabs = useTabs(props);
  return <TabsContext.Provider value={tabs}>{children}</TabsContext.Provider>;
};

export const useTabsContext = makeContextConsumerHook(TabsContext);
