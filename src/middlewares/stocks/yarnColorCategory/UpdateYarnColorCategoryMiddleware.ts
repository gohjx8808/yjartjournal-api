import { NextFunction, Request, Response } from 'express';
import YarnColorCategoryRepository from '../../../repositories/YarnColorCategoryRepository';
import { UpdateYarnColorCategoryPayload } from '../../../services/stock/typings';

const UpdateYarnColorCategoryMiddleware = async (
  req: Request<{}, any, UpdateYarnColorCategoryPayload>,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.body;

  const yarnColorCategoryRepository = new YarnColorCategoryRepository();

  const existingById = await yarnColorCategoryRepository.getById(payload.id);
  if (!existingById) {
    return res.status(404).json({ message: 'Invalid yarn color category id.' });
  }

  const existingByName = await yarnColorCategoryRepository.getByNameExceptSelf(
    payload,
  );
  if (existingByName) {
    return res
      .status(422)
      .json({ message: 'Duplicated yarn color category detected.' });
  }

  return next();
};

export default UpdateYarnColorCategoryMiddleware;
