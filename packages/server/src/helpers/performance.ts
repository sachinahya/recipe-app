import logger from '@sachinahya/logger';
import { performance } from 'perf_hooks';

export const createTimer = (loggerFn: (message: string) => void = logger.info) => {
  const start = performance.now();

  return (messageFn: (ms: number) => string): void => {
    const diff = Math.round(performance.now() - start);
    loggerFn(messageFn(diff));
  };
};
