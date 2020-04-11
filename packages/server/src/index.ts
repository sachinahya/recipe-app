import 'reflect-metadata';
import getShowOnRoad from './app';
import config from './config';
import logger from '@sachinahya/logger';

getShowOnRoad(config).catch(err => {
  logger.error(err);
  process.exit(1);
});
