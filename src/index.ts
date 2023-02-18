require('dotenv').config({ path: './.env' });
import express from 'express';
import { dataSource } from './dataSource';
import { accountRouter } from './routers/accountRouter';
import { addressRouter } from './routers/addressRouter';
import { feedbackRouter } from './routers/feedbackRouter';
import { orderRouter } from './routers/orderRouter';
import { productRouter } from './routers/productRouter';
import { userRouter } from './routers/userRouter';
var cors = require('cors');

const app: express.Application = express();

dataSource.initialize().then(async () => {
  await dataSource.runMigrations();

  const port: number = 3000;

  app.use(cors());

  app.use(express.json());

  app.get('/', (_req, _res) => {
    _res.send('TypeScript With Express');
  });

  app.use('/products', productRouter);

  app.use('/feedbacks', feedbackRouter);

  app.use('/users', userRouter);

  app.use('/account', accountRouter);

  app.use('/addresses', addressRouter);

  app.use('/orders', orderRouter);

  app.listen(port);
});
