import React from 'react';

const useTimeout = <T extends Function>(cb: T, delay: number): (() => void) => {
  const [isActive, setIsActive] = React.useState(false);
  const savedCallback = React.useRef<T>();

  React.useEffect(() => {
    savedCallback.current = cb;
  }, [cb]);

  React.useEffect(() => {
    if (isActive && savedCallback.current) {
      const timeout = window.setTimeout(savedCallback.current, delay);
      setIsActive(false);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [delay, isActive]);

  return () => setIsActive(true);
};

export default useTimeout;
