import { makeContextConsumerHook } from '@sachinahya/utils';
import useStorage from 'hooks/useStorage';
import React from 'react';

const ScrollRestorationContext = React.createContext<
  | {
      scrollHistory: Dictionary<[number, number]> | null;
      addScrollHistory: (locationKey: string, x: number, y: number) => void;
    }
  | undefined
>(undefined);

export const useScrollRestorationContext = makeContextConsumerHook(ScrollRestorationContext);

interface ScrollRestorationProviderProps {
  storageKey: string;
}

const ScrollRestorationProvider: React.FC<ScrollRestorationProviderProps> = ({
  children,
  storageKey,
}) => {
  const [scrollHistory, setScrollHistory] = useStorage<Dictionary<[number, number]>>(storageKey, {
    session: true,
  });

  const addScrollHistory = React.useCallback(
    (locationKey: string, x: number, y: number) => {
      setScrollHistory(value => ({
        ...value,
        [locationKey]: [x, y],
      }));
    },
    [setScrollHistory]
  );

  const value = React.useMemo(() => {
    return {
      scrollHistory,
      addScrollHistory,
    };
  }, [addScrollHistory, scrollHistory]);

  return (
    <ScrollRestorationContext.Provider value={value}>{children}</ScrollRestorationContext.Provider>
  );
};

export default ScrollRestorationProvider;
