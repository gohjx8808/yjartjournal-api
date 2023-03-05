import { insertNewFeedback } from '../../repositories/feedbackRepository';
import { FeedbackPayload } from './typings';

export const saveFeedback = async (payload: FeedbackPayload) => {
  const feedbackCreated = await insertNewFeedback(payload);

  return feedbackCreated;
};
