import { NextFunction, Request, Response } from 'express';
import YarnCategoryRepository from '../../../repositories/YarnCategoryRepository';
import { DeleteYarnCategoryPayload } from '../../../services/stock/typings';
import YarnStockRepository from '../../../repositories/YarnStockRepository';

const DeleteYarnCategoryMiddleware = async (
  req: Request<{}, any, DeleteYarnCategoryPayload>,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.body;

  const yarnCategoryRepository = new YarnCategoryRepository();
  const yarnStockRepository = new YarnStockRepository();

  const existingById = await yarnCategoryRepository.getById(payload.id);
  if (!existingById) {
    return res.status(404).json({ message: 'Invalid yarn category id.' });
  }

  const existingYarnStock = await yarnStockRepository.getByYarnCategoryId(
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

export default DeleteYarnCategoryMiddleware;
