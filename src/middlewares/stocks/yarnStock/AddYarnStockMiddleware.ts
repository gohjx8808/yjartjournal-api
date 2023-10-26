import { NextFunction, Request, Response } from 'express';
import { AddNewYarnStockPayload } from '../../../services/stock/typings';
import YarnStockRepository from '../../../repositories/YarnStockRepository';

const AddYarnStockMiddleware = async (
  req: Request<{}, any, AddNewYarnStockPayload>,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.body;
  const yarnStockRepository = new YarnStockRepository();

  const sameDataExist =
    await yarnStockRepository.getByCategoryIdColorCategoryIdName(
      payload.yarnCategoryId,
      payload.yarnColorCategoryId,
      payload.name,
    );

  if (sameDataExist) {
    return res.status(422).json({ message: 'Duplicated data detected.' });
  }

  return next();
};

export default AddYarnStockMiddleware;
