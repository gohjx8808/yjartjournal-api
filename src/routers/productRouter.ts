import app from 'express';
import { getAllProducts } from '../services/products/productServices';
import { GetAllProductsPayload } from '../services/products/typings';
import multer from 'multer';
import { allProductsValidator } from '../requestValidators/productValidators';
import { dataSource } from '../dataSource';
import SortOptions from '../entities/SortOptions';
const upload = multer();

export const productRouter = app.Router();

productRouter.post<{}, any, GetAllProductsPayload>('/', ...[upload.none(), ...allProductsValidator], async (req, res) => {
  const payload = req.body;
  const abc = await dataSource.manager.find(SortOptions);
  console.log(abc);
  res.json({ data: await getAllProducts(payload) });
});
