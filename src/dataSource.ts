import { DataSource } from 'typeorm';
import { SeedSortOptions1672062650913 } from '../migrations/1672062650913-SeedSortOptions';
import { SeedOrderStatuses1675693903490 } from '../migrations/1675693903490-SeedOrderStatuses';
import { SeedStates1677079230858 } from '../migrations/1677079230858-SeedStates';
import Addresses from './entities/Addresses';
import CheckoutItems from './entities/CheckoutItems';
import Feedbacks from './entities/Feedbacks';
import Orders from './entities/Orders';
import OrderStatuses from './entities/OrderStatuses';
import PromoCodes from './entities/PromoCodes';
import SortOptions from './entities/SortOptions';
import States from './entities/States';
import { Users } from './entities/Users';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRESQL_DB_HOST,
  port: parseInt(process.env.POSTGRESQL_DB_PORT || '0', 10),
  username: process.env.POSTGRESQL_DB_USER,
  password: process.env.POSTGRESQL_DB_PASSWORD,
  database: process.env.POSTGRESQL_DB_DATABASE,
  entities: [
    SortOptions,
    Feedbacks,
    Users,
    States,
    Addresses,
    PromoCodes,
    OrderStatuses,
    Orders,
    CheckoutItems,
  ],
  migrations: [
    SeedSortOptions1672062650913,
    SeedOrderStatuses1675693903490,
    SeedStates1677079230858,
  ],
  synchronize: true,
  logging: false,
});

export const manager = dataSource.manager;

export const userRepository = manager.getRepository(Users);

export const addressRepository = manager.getRepository(Addresses);

export const promoCodeRepository = manager.getRepository(PromoCodes);

export const orderRepository = manager.getRepository(Orders);

export const checkoutItemRepository = manager.getRepository(CheckoutItems);

export const stateRepository = manager.getRepository(States);
