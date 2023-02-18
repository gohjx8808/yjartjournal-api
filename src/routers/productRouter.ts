import { Router } from 'express';
import multer from 'multer';
import GetProductValidator from '../requestValidators/GetProductValidator';
import {
  getAllImages,
  getAllProducts,
  getProductCategories,
  getSortOptions,
} from '../services/product/productServices';
import { GetAllProductsPayload } from '../services/product/typings';
const upload = multer();

export const productRouter = Router();

productRouter.get('/categories', async (_req, res) => {
  const categories = await getProductCategories();
  return res.json({ data: categories });
});

productRouter.post<{}, any, GetAllProductsPayload>(
  '/',
  ...[upload.none(), ...GetProductValidator],
  async (req, res) => {
    const payload = req.body;
    return res.json({ data: await getAllProducts(payload) });
  },
);

productRouter.get('/sort-options', async (_req, res) => {
  const sortOptions = await getSortOptions();
  return res.json({ data: sortOptions });
});

productRouter.get('/image-gallery', async (_req, res) => {
  const productImages = await getAllImages();
  return res.json({ data: productImages });
});
