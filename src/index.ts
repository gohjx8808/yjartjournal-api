require('dotenv').config({ path: './.env' });
import express from 'express';
import { dataSource } from './dataSource';
import { productRouter } from './routers/productRouter';
var cors = require('cors');

const app: express.Application = express();

dataSource.initialize().then(async ()=>{
  await dataSource.runMigrations();
  
  const port: number = 3000;

  app.use(cors());
  
  app.use(express.json());

  app.get('/', (_req, _res) => {
    _res.send('TypeScript With Express');
  });

  app.use('/products', productRouter);

  app.listen(port);
});

