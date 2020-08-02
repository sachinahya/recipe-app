import { CorsOptions } from 'cors';
import path from 'path';

export interface AppConfig {
  isDevelopment: boolean;
  isTest: boolean;
  useHttps: boolean;
  serverPort: number;
  sessionSecret: string;
  serveClient: boolean;
  uploads: UploadsConfig;
  db: DbConfig;
  cors: CorsOptions;
  auth: AuthConfig;
}

export interface DbConfig {
  url?: string;
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

export interface AuthConfig {
  redirectUrl: string;
  googleClientId: string;
  googleClientSecret: string;
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
    useHttps: getEnvValue('SERVER_HTTPS', false) === 'true',
    serverPort: parseInt(getEnvValue('SERVER_PORT')),
    sessionSecret: getEnvValue('SESSION_SECRET'),
    serveClient: getEnvValue('SERVE_CLIENT', false) === 'true',
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
      url: process.env.DATABASE_URL || undefined,
      host: getEnvValue('DB_HOST'),
      port: parseInt(getEnvValue('DB_PORT')),
      username: getEnvValue('DB_USERNAME'),
      password: getEnvValue('DB_PASSWORD'),
      database: getEnvValue('DB_DATABASE'),
      dropSchema: isDevelopment && getEnvValue('DB_DROP_SCHEMA', false) === 'true',
    },
    auth: {
      googleClientId: getEnvValue('GOOGLE_CLIENT_ID'),
      googleClientSecret: getEnvValue('GOOGLE_CLIENT_SECRET'),
      redirectUrl: getEnvValue('GOOGLE_REDIRECT_URL'),
    },
  };
})(process.env);
