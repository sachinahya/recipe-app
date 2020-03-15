import React from 'react';

interface UseCounterOptions {
  initial?: number;
  min?: number;
  max?: number;
}

const useCounter = ({ initial = 0, min = -Infinity, max = Infinity }: UseCounterOptions = {}): [
  number,
  {
    increment(): void;
    decrement(): void;
    set(count: number): void;
    reset(): void;
  }
] => {
  const [count, setCount] = React.useState(initial);

  const increment = React.useCallback(() => {
    setCount(c => Math.min(c + 1, max));
  }, [max]);

  const decrement = React.useCallback(() => {
    setCount(c => Math.max(c - 1, min));
  }, [min]);

  const set = React.useCallback(
    (count: number) => {
      if (count <= max && count >= min) setCount(count);
    },
    [min, max]
  );

  const reset = React.useCallback(() => {
    setCount(initial);
  }, [initial]);

  return [
    count,
    {
      increment,
      decrement,
      set,
      reset,
    },
  ];
};

export default useCounter;
