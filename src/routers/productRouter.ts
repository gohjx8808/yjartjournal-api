import app from 'express';
import { getAllProducts } from '../services/products/productServices';

export const productRouter = app.Router()

productRouter.get('/', async (_req, res) => {
    res.json({ data: await getAllProducts() })
})