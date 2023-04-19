import { NextFunction, Request, Response } from 'express';
import YarnColorCategoryRepository from '../../../repositories/YarnColorCategoryRepository';
import { DeleteYarnColorCategoryPayload } from '../../../services/stock/typings';
import YarnStockRepository from '../../../repositories/YarnStockRepository';

const DeleteYarnColorCategoryMiddleware = async (
  req: Request<{}, any, DeleteYarnColorCategoryPayload>,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.body;

  const yarnColorCategoryRepository = new YarnColorCategoryRepository();
  const yarnStockRepository = new YarnStockRepository();

  const existingById = await yarnColorCategoryRepository.getById(payload.id);
  if (!existingById) {
    return res.status(404).json({ message: 'Invalid yarn color category id.' });
  }

  const existingYarnStock = await yarnStockRepository.getByYarnColorCategoryId(
    payload.id,
  );
  if (existingYarnStock) {
    return res.status(422).json({
      message:
        'There is existing stock associates. Please remove it and try again.',
    });
  }

  return next();
};

export default DeleteYarnColorCategoryMiddleware;
