import 'reflect-metadata';

import logger from '@sachinahya/logger';
import Container from 'typedi';

import getShowOnRoad from './app';
import config from './config';
import { CLOUD_STORAGE_SERVICE_TOKEN } from './services/contracts/CloudStorageService';
import GoogleCloudStorageService from './services/google/GoogleCloudStorageService';

Container.set(CLOUD_STORAGE_SERVICE_TOKEN, new GoogleCloudStorageService());

getShowOnRoad(config).catch(err => {
  logger.error(err);
  process.exit(1);
});
