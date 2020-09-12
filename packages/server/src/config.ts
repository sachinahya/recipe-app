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
  dropSchema: boolean;
}

export interface CorsConfig {
  credentials: boolean;
  origins?: string[];
}

export interface UploadsConfig {
  dir: string;
  url: string;
  keyFileName?: string;
  bucketName: string;
}

export interface AuthConfig {
  redirectUrl: string;
  googleClientId: string;
  googleClientSecret: string;
}

function getEnvValue(key: string, validation?: true | RegExp): string;
function getEnvValue(key: string, validation: false): string | undefined;
function getEnvValue(key: string, validation: boolean | RegExp = true): string | undefined {
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

  const storageKeyFileName = getEnvValue('RA_GOOGLE_STORAGE_PRIVATE_KEY', false);

  return {
    isDevelopment,
    isTest: env.NODE_ENV === 'test',
    useHttps: getEnvValue('RA_SERVER_HTTPS', false) === 'true',
    serverPort: parseInt(getEnvValue('PORT', false) || '4000'),
    sessionSecret: getEnvValue('RA_SESSION_SECRET'),
    serveClient: getEnvValue('RA_SERVE_CLIENT', false) === 'true',
    uploads: {
      dir: path.join(process.cwd(), getEnvValue('RA_UPLOAD_DIR')),
      url: new URL(getEnvValue('RA_UPLOAD_URI')).href,
      keyFileName:
        storageKeyFileName != null
          ? path.join(__dirname, '../../../', storageKeyFileName)
          : undefined,
      bucketName: getEnvValue('RA_GOOGLE_STORAGE_BUCKET'),
    },
    cors: {
      credentials: getEnvValue('RA_CORS_CREDENTIALS', false) === 'true',
      origin: getEnvValue('RA_CORS_ORIGINS', false)
        ?.split(',')
        .map(x => x.trim()),
    },
    db: {
      url: process.env.DATABASE_URL || undefined,
      dropSchema: isDevelopment && getEnvValue('RA_DB_DROP_SCHEMA', false) === 'true',
    },
    auth: {
      googleClientId: getEnvValue('RA_GOOGLE_CLIENT_ID'),
      googleClientSecret: getEnvValue('RA_GOOGLE_CLIENT_SECRET'),
      redirectUrl: getEnvValue('RA_GOOGLE_REDIRECT_URL'),
    },
  };
})(process.env);
