import { NextFunction, Request, Response } from "express";
import YarnCategoryRepository from "../../../repositories/YarnCategoryRepository";
import { UpdateYarnCategoryPayload } from "../../../services/stock/typings";

const UpdateYarnCategoryMiddleware = async (
  req: Request<{}, any, UpdateYarnCategoryPayload>,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;

  const yarnCategoryRepository = new YarnCategoryRepository();

  const existingById = await yarnCategoryRepository.getById(payload.id);
  if (!existingById) {
    return res.status(404).json({ message: "Invalid yarn category id." });
  }

  const existingByName = await yarnCategoryRepository.getByNameExceptSelf(
    payload
  );
  if (existingByName) {
    return res
      .status(422)
      .json({ message: "Duplicated yarn category detected." });
  }

  return next();
};

export default UpdateYarnCategoryMiddleware;
