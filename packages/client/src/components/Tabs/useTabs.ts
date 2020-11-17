import { useCounter } from '@sachinahya/hooks';
import React from 'react';

export interface UseTabsOptions {
  count: number;
  enabled?: boolean;
  initial?: number;
  disabledTabs?: number[];
  tabsAreButtons?: boolean;
  tabId?: string;
  tabPanelId?: string;
  swipeable?: boolean;
}

export interface UseTabsHook {
  enabled: boolean;
  current: number;
  setCurrent: (index: number) => void;
  getTablistProps: () => TablistProps;
  getTabProps: (index: number) => TabProps;
  getTabPanelProps: (index: number) => TabPanelProps;
}

type TablistProps = Pick<React.HTMLAttributes<Element>, 'role' | 'onKeyDown'>;
type TabProps = React.RefAttributes<any> &
  React.AriaAttributes &
  Pick<React.HTMLAttributes<Element>, 'role' | 'tabIndex' | 'id'>;
type TabPanelProps = React.HTMLAttributes<HTMLElement>;

export const useTabs = (
  {
    count,
    enabled = true,
    initial,
    disabledTabs = [],
    tabId = 'tab',
    tabPanelId = 'tabpanel',
    tabsAreButtons = true,
    swipeable = true,
  }: UseTabsOptions = { count: 0 }
): UseTabsHook => {
  const maxIndex = count - 1;
  const [current, { set }] = useCounter({
    initial,
    min: 0,
    max: maxIndex,
  });

  const isKeyboard = React.useRef(false);
  const focusRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (enabled && isKeyboard.current) {
      focusRef.current && focusRef.current.focus();
      isKeyboard.current = false;
    }
  }, [enabled]);

  const getNextEnabledTab = (next: boolean) => {
    let newIndex = next ? current + 1 : current - 1;

    if (newIndex > maxIndex) newIndex = 0;
    if (newIndex < 0) newIndex = maxIndex;

    if (disabledTabs.length && disabledTabs.length !== maxIndex + 1) {
      while (disabledTabs.includes(newIndex)) {
        next ? newIndex++ : newIndex--;
      }
    }

    return newIndex;
  };

  const handleKeyDown = ({ keyCode }: React.KeyboardEvent) => {
    // Left arrow || right arrow
    if (enabled && (keyCode === 37 || keyCode === 39)) {
      isKeyboard.current = true;

      set(getNextEnabledTab(keyCode === 39));
    }
  };

  const setCurrent = (index: number) => {
    set(index);
  };

  const getTablistProps = (): TablistProps => {
    return !enabled
      ? {}
      : {
          role: 'tablist',
          onKeyDown: handleKeyDown,
        };
  };

  const getTabProps = (index: number): TabProps => {
    return !enabled
      ? {}
      : Object.assign(
          {
            role: 'tab',
            tabIndex: current === index ? 0 : -1,
            id: `${tabId}-${index}`,
            'aria-disabled': disabledTabs.includes(index),
            'aria-selected': current === index,
            'aria-controls': `${tabPanelId}-${index}`,
            ref: (ref: any) => (current === index ? (focusRef.current = ref) : undefined),
            // onClick: handleClick(index),
          },
          tabsAreButtons && { disabled: disabledTabs.includes(index) }
        );
  };

  const getTabPanelProps = (index: number): TabPanelProps => {
    return !enabled
      ? {}
      : {
          role: 'tabpanel',
          // tabIndex: 0,
          id: `${tabPanelId}-${index}`,
          'aria-labelledby': `${tabId}-${index}`,
          hidden: swipeable ? false : current !== index,
        };
  };

  return {
    enabled,
    current,
    setCurrent,
    getTablistProps,
    getTabProps,
    getTabPanelProps,
  };
};
