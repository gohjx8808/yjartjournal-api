require('dotenv').config({ path: './.env' });
import express from 'express';
import { dataSource } from './src/dataSource';
import { productRouter } from './src/routers/productRouter';

const app: express.Application = express();

const port: number = 3000;

app.use(express.json());

app.get('/', (_req, _res) => {
  _res.send('TypeScript With Express');
});

app.use('/products', productRouter);

app.listen(port, async () => {
  await dataSource.initialize();
  await dataSource.runMigrations();
  console.log(`TypeScript with Express http://localhost:${port}/`);
});
