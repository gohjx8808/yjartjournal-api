import { NextFunction, Request, Response } from 'express';
import YarnCategoryRepository from '../../../repositories/YarnCategoryRepository';
import { DeleteYarnCategoryPayload } from '../../../services/stock/typings';

const DeleteYarnCategoryMiddleware = async (
  req: Request<{}, any, DeleteYarnCategoryPayload>,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.body;

  const yarnCategoryRepository = new YarnCategoryRepository();

  const existingById = await yarnCategoryRepository.getById(payload.id);
  if (!existingById) {
    return res.status(404).json({ message: 'Invalid yarn category id.' });
  }

  return next();
};

export default DeleteYarnCategoryMiddleware;
