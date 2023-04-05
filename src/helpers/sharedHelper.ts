import { AuthenticatedUserData } from '../services/user/typings';
import { CustomAuthenticatedRequest } from '../typings';

export const typeAuthenticatedUser = (req: CustomAuthenticatedRequest) => {
  if (req.user) {
    return req.user.valueOf() as AuthenticatedUserData;
  }
};
