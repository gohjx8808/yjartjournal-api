import { manager } from '../dataSource';
import Feedbacks from '../entities/Feedbacks';
import { FeedbackPayload } from '../services/feedback/typings';

const feedbackManager = manager.getRepository(Feedbacks);

export const insertNewFeedback = (payload: FeedbackPayload) =>
  feedbackManager.insert(payload);
