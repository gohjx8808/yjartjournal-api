require('dotenv').config({ path: './.env' });
import express from 'express';
import { dataSource } from './dataSource';
import accountRouter from './routers/accountRouter';
import addressRouter from './routers/addressRouter';
import feedbackRouter from './routers/feedbackRouter';
import forgotPasswordRouter from './routers/forgotPasswordRouter';
import orderRouter from './routers/orderRouter';
import productRouter from './routers/productRouter';
import stockRouter from './routers/stock/stockRouter';
import userRouter from './routers/userRouter';
var cors = require('cors');

const app: express.Application = express();

dataSource.initialize();

const port: number = 3000;

app.use(cors());

app.use(express.json());

app.get('/', async (_req, _res) => {
  await dataSource.runMigrations();
  _res.send('TypeScript With Express');
});

app.use('/products', productRouter);

app.use('/feedbacks', feedbackRouter);

app.use('/users', userRouter);

app.use('/account', accountRouter);

app.use('/addresses', addressRouter);

app.use('/orders', orderRouter);

app.use('/forgot-password', forgotPasswordRouter);

app.use('/stocks', stockRouter);

app.listen(port);

export default app;
