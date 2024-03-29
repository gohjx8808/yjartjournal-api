import { DataSource } from 'typeorm';
import { SeedSortOptions1672062650913 } from '../migrations/1672062650913-SeedSortOptions';
import { SeedOrderStatuses1675693903490 } from '../migrations/1675693903490-SeedOrderStatuses';
import { SeedStates1677079230858 } from '../migrations/1677079230858-SeedStates';
import { SeedYarnCategories1680409712499 } from '../migrations/1680409712499-SeedYarnCategories';
import { SeedYarnColorCategories1680410495324 } from '../migrations/1680410495324-SeedYarnColorCategories';
import Addresses from './entities/Addresses';
import CheckoutItems from './entities/CheckoutItems';
import Feedbacks from './entities/Feedbacks';
import OrderStatuses from './entities/OrderStatuses';
import Orders from './entities/Orders';
import PromoCodes from './entities/PromoCodes';
import ResetPasswordTokens from './entities/ResetPasswordTokens';
import SortOptions from './entities/SortOptions';
import States from './entities/States';
import Users from './entities/Users';
import YarnCategories from './entities/YarnCategories';
import YarnColorCategories from './entities/YarnColorCategories';
import YarnStocks from './entities/YarnStocks';
import Roles from './entities/Roles';
import UserRoles from './entities/UserRoles';
import { SeedRoles1687096310531 } from '../migrations/1687096310531-SeedRoles';
import YarnStockImages from './entities/YarnStockImages';
import PromoTypes from './entities/PromoTypes';
import { SeedPromoTypes1702252889920 } from '../migrations/1702252889920-SeedPromoTypes';

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
    ResetPasswordTokens,
    YarnStocks,
    YarnCategories,
    YarnColorCategories,
    Roles,
    UserRoles,
    YarnStockImages,
    PromoTypes,
  ],
  migrations: [
    SeedSortOptions1672062650913,
    SeedOrderStatuses1675693903490,
    SeedStates1677079230858,
    SeedYarnCategories1680409712499,
    SeedYarnColorCategories1680410495324,
    SeedRoles1687096310531,
    SeedPromoTypes1702252889920,
  ],
  synchronize: true,
  logging: false,
  ssl: process.env.NODE_ENV === 'production' && {
    ca: process.env.AIVEN_DB_CERT,
  },
});

export const manager = dataSource.manager;
