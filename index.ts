
import express from 'express';
import { productRouter } from './src/routers/productRouter';

const app: express.Application = express();

const port: number = 3000;

app.get('/', (_req, _res) => {
  _res.send("TypeScript With Express");
});

app.use('/products', productRouter)

app.listen(port, () => {
  console.log(`TypeScript with Express http://localhost:${port}/`);
});