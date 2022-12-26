import { DataSource } from 'typeorm';
import { SeedSortOptions1672062650913 } from '../migrations/1672062650913-SeedSortOptions';
import SortOptions from './entities/SortOptions';

export const dataSource = new DataSource({
  type: 'mysql', 
  host: process.env.MY_SQL_DB_HOST,
  port:  parseInt(process.env.MY_SQL_DB_PORT || '0', 10),
  username: process.env.MY_SQL_DB_USER,
  password: process.env.MY_SQL_DB_PASSWORD,
  database: process.env.MY_SQL_DB_DATABASE,
  entities: [
    SortOptions,
  ],
  migrations:[
    SeedSortOptions1672062650913,
  ],
  synchronize: true,
  logging: false,
});