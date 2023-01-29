import { DataSource } from 'typeorm';
import { SeedSortOptions1672062650913 } from '../migrations/1672062650913-SeedSortOptions';
import Feedbacks from './entities/Feedbacks';
import SortOptions from './entities/SortOptions';
import { Users } from './entities/Users';

export const dataSource = new DataSource({
  type: 'postgres', 
  host: process.env.POSTGRESQL_DB_HOST,
  port:  parseInt(process.env.POSTGRESQL_DB_PORT || '0', 10),
  username: process.env.POSTGRESQL_DB_USER,
  password: process.env.POSTGRESQL_DB_PASSWORD,
  database: process.env.POSTGRESQL_DB_DATABASE,
  entities: [
    SortOptions,
    Feedbacks,
    Users,
  ],
  migrations:[
    SeedSortOptions1672062650913,
  ],
  synchronize: true,
  logging: false,
});

export const manager = dataSource.manager;

export const userRepository = manager.getRepository(Users);