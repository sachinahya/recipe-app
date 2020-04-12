import 'reflect-metadata';

import logger from '@sachinahya/logger';

import getShowOnRoad from './app';
import config from './config';

getShowOnRoad(config).catch(err => {
  logger.error(err);
  process.exit(1);
});
