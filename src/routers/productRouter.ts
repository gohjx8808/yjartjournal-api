import app from 'express';
import {
  getAllImages,
  getAllProducts,
} from '../services/products/productServices';
import { GetAllProductsPayload } from '../services/products/typings';
import multer from 'multer';
import { allProductsValidator } from '../requestValidators/productValidators';
import { dataSource } from '../dataSource';
import SortOptions from '../entities/SortOptions';
const upload = multer();

export const productRouter = app.Router();

productRouter.post<{}, any, GetAllProductsPayload>(
  '/',
  ...[upload.none(), ...allProductsValidator],
  async (req, res) => {
    const payload = req.body;
    res.json({ data: await getAllProducts(payload) });
  },
);

productRouter.get('/sort-options', async (_req, res) => {
  const sortOptions = await dataSource.manager.find(SortOptions);
  res.json({ data: sortOptions });
});

productRouter.get('/image-gallery', async (_req, res) => {
  const productImages = await getAllImages();
  res.json({ data: productImages });
});
