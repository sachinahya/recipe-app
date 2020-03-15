import { performance } from 'perf_hooks';
import logger from '@sachinahya/logger';

export const createTimer = (loggerFn: (message: string) => void = logger.info) => {
  const start = performance.now();

  return (messageFn: (ms: number) => string): void => {
    const diff = Math.round(performance.now() - start);
    loggerFn(messageFn(diff));
  };
};
