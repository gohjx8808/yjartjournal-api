import { Router } from 'express';
import multer from 'multer';
import { submitFeedbackValidator } from '../requestValidators/feedbackValidators';
import { saveFeedback } from '../services/feedback/feedbackServices';
import { FeedbackPayload } from '../services/feedback/typings';
const upload = multer();

export const feedbackRouter = Router();

feedbackRouter.post<{}, any, FeedbackPayload>(
  '/submit',
  ...[upload.none(), ...submitFeedbackValidator],
  async (req, res) => {
    const payload = req.body;

    const response = await saveFeedback(payload);
    return res.json({ response });
  },
);
