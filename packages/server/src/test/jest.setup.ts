/* eslint-disable @typescript-eslint/no-var-requires */
import logger from '@sachinahya/logger';

require('dotenv').config({ path: require('path').join(__dirname, '../../../../.env') });

// Suppress messages from logger.
jest.spyOn(logger, 'info').mockImplementation(() => null as any);
jest.spyOn(logger, 'warn').mockImplementation(() => null as any);
jest.spyOn(logger, 'error').mockImplementation(() => null as any);
