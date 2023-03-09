import { AuthenticatedUserData } from '../services/user/typings';
import { CustomAuthenticatedRequest } from '../typings';

export const typeAuthenticatedUser = (req: CustomAuthenticatedRequest) =>
  req.user.valueOf() as AuthenticatedUserData;
