import { Router } from "express";
import multer from "multer";
import FeedbackValidator from "../requestValidators/FeedbackValidator";
import { saveFeedback } from "../services/feedback/feedbackServices";
import { FeedbackPayload } from "../services/feedback/typings";
const upload = multer();

const feedbackRouter = Router();

feedbackRouter.post<{}, any, FeedbackPayload>(
  "/submit",
  ...[upload.none(), ...FeedbackValidator],
  async (req, res) => {
    const payload = req.body;
    const response = await saveFeedback(payload);

    return res.json({ response });
  }
);

export default feedbackRouter;
