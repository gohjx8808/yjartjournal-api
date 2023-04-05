import { NextFunction, Request, Response } from "express";
import { getUserByEmail } from "../../repositories/userRepository";
import { ForgotPasswordPayload } from "../../services/forgotPassword/typings";

const ForgotPasswordMiddleware =
  () =>
  async (
    req: Request<{}, any, ForgotPasswordPayload>,
    res: Response,
    next: NextFunction
  ) => {
    const payload = req.body;

    const userDetails = await getUserByEmail(payload.email);

    if (userDetails) {
      return next();
    }

    return res
      .status(404)
      .json({ message: "The email inserted is not in the system." });
  };

export default ForgotPasswordMiddleware;
