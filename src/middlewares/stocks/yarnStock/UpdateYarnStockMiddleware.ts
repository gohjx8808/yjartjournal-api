import { NextFunction, Request, Response } from 'express';
import { UpdateYarnStockPayload } from '../../../services/stock/typings';
import YarnStockRepository from '../../../repositories/YarnStockRepository';

const UpdateYarnStockMiddleware = async (
  req: Request<{}, any, UpdateYarnStockPayload>,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.body;
  const yarnStockRepository = new YarnStockRepository();

  const dataExist = await yarnStockRepository.getById(payload.yarnId);

  if (!dataExist) {
    return res.status(404).json({ message: 'Invalid yarn id.' });
  }

  const sameDataExist =
    await yarnStockRepository.getByCategoryIdColorCategoryIdName(
      payload.yarnCategoryId,
      payload.yarnColorCategoryId,
      payload.name,
      payload.yarnId,
    );

  if (sameDataExist) {
    return res.status(422).json({ message: 'Duplicated data detected.' });
  }

  return next();
};

export default UpdateYarnStockMiddleware;
