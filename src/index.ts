require('dotenv').config({ path: './.env' });
import express from 'express';
import accountRouter from './routers/accountRouter';
import addressRouter from './routers/addressRouter';
import feedbackRouter from './routers/feedbackRouter';
import forgotPasswordRouter from './routers/forgotPasswordRouter';
import orderRouter from './routers/orderRouter';
import productRouter from './routers/productRouter';
import stockRouter from './routers/stock/stockRouter';
import userRouter from './routers/userRouter';
import { dataSource } from './dataSource';
import { v2 as cloudinary } from 'cloudinary';
var cors = require('cors');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const app: express.Application = express();

const port: number = 3000;

app.use(cors());

app.use(express.json());

app.use(async (_req, _res, next) => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  return next();
});

app.get('/', (_req, _res) => {
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
