export const sleep = (time: number): Promise<void> =>
  new Promise(resolve => window.setTimeout(resolve, time));

type TimerFn = (messageFn: (ms: number) => string) => void;

export const createTimer = (loggerFn: (message: string) => void = console.log): TimerFn => {
  const start = performance.now();

  return (messageFn: (ms: number) => string): void => {
    const diff = Math.round(performance.now() - start);
    loggerFn(messageFn(diff));
  };
};

export const longRunningFunction = (): void => {
  let str = '';
  while (str.length < 2e7) {
    str += 'e';
  }
};
