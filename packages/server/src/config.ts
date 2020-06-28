import { CorsOptions } from 'cors';
import path from 'path';

export interface AppConfig {
  isDevelopment: boolean;
  isTest: boolean;
  serverPort: number;
  sessionSecret: string;
  uploads: UploadsConfig;
  db: DbConfig;
  cors: CorsOptions;
}

export interface DbConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dropSchema: boolean;
}

export interface CorsConfig {
  credentials: boolean;
  origins?: string[];
}

export interface UploadsConfig {
  dir: string;
  url: string;
}

function getEnvValue(key: string, validation?: true | RegExp): string;
function getEnvValue(key: string, validation: false): string | undefined;
function getEnvValue(key: string, validation: boolean | RegExp = true): string | undefined {
  key = 'RA_' + key;
  const value = process.env[key];

  if (!validation) return value;

  if (validation && value === undefined)
    throw new Error(`Required environment variable ${key} is not defined.`);

  if (validation instanceof RegExp && !validation.test(value as string))
    throw new Error(
      `Value provided for environment variable ${key} does not match pattern ${validation}.`
    );

  return value;
}

export default ((env: NodeJS.ProcessEnv): AppConfig => {
  const isDevelopment = env.NODE_ENV === 'development';

  return {
    isDevelopment,
    isTest: env.NODE_ENV === 'test',
    serverPort: parseInt(getEnvValue('SERVER_PORT')),
    sessionSecret: getEnvValue('SESSION_SECRET'),
    uploads: {
      dir: path.join(process.cwd(), getEnvValue('UPLOAD_DIR')),
      url: new URL(getEnvValue('UPLOAD_URI')).href,
    },
    cors: {
      credentials: getEnvValue('CORS_CREDENTIALS') === 'true',
      origin: getEnvValue('CORS_ORIGINS', false)
        ?.split(',')
        .map(x => x.trim()),
    },
    db: {
      host: getEnvValue('DB_HOST'),
      port: parseInt(getEnvValue('DB_PORT')),
      username: getEnvValue('DB_USERNAME'),
      password: getEnvValue('DB_PASSWORD'),
      database: getEnvValue('DB_DATABASE'),
      dropSchema: isDevelopment && getEnvValue('DB_DROP_SCHEMA', false) === 'true',
    },
  };
})(process.env);
