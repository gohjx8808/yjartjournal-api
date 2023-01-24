import app from 'express';
import {
  getAllImages,
  getAllProducts,
  getProductCategories,
  getSortOptions,
} from '../services/products/productServices';
import { GetAllProductsPayload } from '../services/products/typings';
import multer from 'multer';
import { allProductsValidator } from '../requestValidators/productValidators';
const upload = multer();

export const productRouter = app.Router();

productRouter.get('/categories', async (_req, res) => {
  const categories = await getProductCategories();
  res.json({ data: categories });
});

productRouter.post<{}, any, GetAllProductsPayload>(
  '/',
  ...[upload.none(), ...allProductsValidator],
  async (req, res) => {
    const payload = req.body;
    res.json({ data: await getAllProducts(payload) });
  },
);

productRouter.get('/sort-options', async (_req, res) => {
  const sortOptions = await getSortOptions();
  res.json({ data: sortOptions });
});

productRouter.get('/image-gallery', async (_req, res) => {
  const productImages = await getAllImages();
  res.json({ data: productImages });
});
