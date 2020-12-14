import logger from '@sachinahya/logger';
import { ApolloServer, ForbiddenError, UserInputError } from 'apollo-server-express';
import cors, { CorsOptions } from 'cors';
import express from 'express';
import session from 'express-session';
import fs from 'fs';
import { graphqlUploadExpress } from 'graphql-upload';
import http from 'http';
import https from 'https';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { Connection, createConnection, useContainer } from 'typeorm';

import authChecker from './auth/authChecker';
import { buildContext, configurePassport } from './auth/passport';
import { AppConfig, DbConfig } from './config';
import RecipeImport from './import/RecipeImport';

const createSessionMiddleware = (app: express.Application, config: AppConfig) => {
  const sessionOptions: session.SessionOptions = {
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: !config.isDevelopment,
    },
  };

  // trust first proxy
  if (!config.isDevelopment) app.set('trust proxy', 1);

  app.use(session(sessionOptions));
};

const createApolloServer = async (app: express.Application, corsOptions: CorsOptions) => {
  const schema = await buildSchema({
    resolvers: [path.join(__dirname, '/resolvers/!(*.test).{js,ts}')],
    emitSchemaFile: true,
    container: Container,
    authChecker,
  });

  const server = new ApolloServer({
    schema,
    context: ctx => buildContext(ctx),
    uploads: false,
    formatError: err => {
      if (err.message.startsWith('Access denied!')) return new ForbiddenError(err.message);
      if (err.message === 'Argument Validation Error')
        return new UserInputError(err.message, err.extensions?.exception.validationErrors);

      logger.error(err);
      return err;
    },
  });

  server.applyMiddleware({ app, cors: corsOptions, path: '/graphql' });
};

const createDatabaseConnection = (db: DbConfig): Promise<Connection> => {
  useContainer(Container);

  return createConnection({
    type: 'postgres',
    url: db.url,
    /* host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.database, */
    entities: [path.join(__dirname + '/entities/**/*.{js,ts}')],

    // development options
    // logging: 'all',
    dropSchema: db.dropSchema,
    synchronize: db.dropSchema,
  });
};

export const getShowOnRoad = async (config: AppConfig): Promise<void> => {
  logger.info(`isDev: ${config.isDevelopment}`);

  logger.info('Initializing app...');
  const app = express();

  logger.info('Connecting to database...');
  await createDatabaseConnection(config.db);

  logger.info('Configuring middleware...');
  app.use(cors(config.cors));
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  app.use('/uploads', express.static(config.uploads.dir));

  logger.info('Configuring auth...');
  createSessionMiddleware(app, config);
  configurePassport(app);

  logger.info('Building schema...');
  await createApolloServer(app, config.cors);

  if (config.serveClient) {
    const clientPath = path.join(__dirname, '../../client/dist');
    logger.info(`Serving client from ${clientPath}...`);
    app.use('/', express.static(clientPath));
  }

  logger.info('Starting server...');
  if (config.useHttps) {
    https
      .createServer(
        {
          cert: fs.readFileSync(path.join(__dirname, '../../../cert/localhost.pem')),
          key: fs.readFileSync(path.join(__dirname, '../../../cert/localhost-key.pem')),
        },
        app
      )
      .listen(config.serverPort);
  } else {
    http.createServer(app).listen(config.serverPort);
  }

  logger.info(`Open for business on port ${config.serverPort}.`);

  if (config.db.dropSchema) {
    logger.info('Importing sample data...');
    await Container.get(RecipeImport).createRecipes();
  }
};
