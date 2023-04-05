import { NextFunction, Request, Response } from 'express';
import YarnColorCategoryRepository from '../../../repositories/YarnColorCategoryRepository';
import { DeleteYarnColorCategoryPayload } from '../../../services/stock/typings';

const DeleteYarnColorCategoryMiddleware = async (
  req: Request<{}, any, DeleteYarnColorCategoryPayload>,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.body;

  const yarnColorCategoryRepository = new YarnColorCategoryRepository();

  const existingById = await yarnColorCategoryRepository.getById(payload.id);
  if (!existingById) {
    return res.status(404).json({ message: 'Invalid yarn color category id.' });
  }

  return next();
};

export default DeleteYarnColorCategoryMiddleware;
