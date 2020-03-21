import path from 'path';
import { createConnection } from 'typeorm';

const db = createConnection({
  type: 'sqlite',
  database: ':memory:',
  entities: [path.join(__dirname, '../entities/**/*.ts')],
  dropSchema: true,
  synchronize: true,
  logging: false,
});

export default db;
