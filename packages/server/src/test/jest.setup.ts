import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(__dirname, '../../.env') });

import logger from '@sachinahya/logger';

// Suppress messages from logger.
// TODO: Need to re-export the Logger type.
jest.spyOn(logger, 'info').mockImplementation(() => null as never);
jest.spyOn(logger, 'warn').mockImplementation(() => null as never);
jest.spyOn(logger, 'error').mockImplementation(() => null as never);
