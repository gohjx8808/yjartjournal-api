require('dotenv').config({ path: './.env' });
import express from 'express';
import { dataSource } from './src/dataSource';
import { productRouter } from './src/routers/productRouter';

dataSource.initialize().then(()=>{
  dataSource.runMigrations();
});

const app: express.Application = express();

const port: number = 3000;

app.use(express.json());

app.get('/', (_req, _res) => {
  _res.send('TypeScript With Express');
});

app.use('/products', productRouter);

app.listen(port);
