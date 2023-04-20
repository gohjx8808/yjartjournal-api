import { NextFunction, Request, Response } from 'express';
import { DeleteYarnStockPayload } from '../../../services/stock/typings';
import YarnStockRepository from '../../../repositories/YarnStockRepository';

const DeleteYarnStockMiddleware = async (
  req: Request<{}, any, DeleteYarnStockPayload>,
  res: Response,
  next: NextFunction,
) => {
  const yarnStockRepository = new YarnStockRepository();

  const payload = req.body;

  const dataExist = await yarnStockRepository.getById(payload.yarnId);

  if (!dataExist) {
    return res.status(404).json({ message: 'Invalid yarn stock id.' });
  }

  return next();
};

export default DeleteYarnStockMiddleware;
