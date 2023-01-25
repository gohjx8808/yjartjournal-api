import { manager } from '../../dataSource';
import Feedbacks from '../../entities/Feedbacks';
import { FeedbackPayload } from './typings';

export const saveFeedback = async (payload:FeedbackPayload)=>{
  const feedbackCreated = await manager.insert(Feedbacks, payload);

  return feedbackCreated;
};
