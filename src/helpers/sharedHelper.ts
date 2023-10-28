import { AuthenticatedUserData } from '../services/user/typings';
import { CustomAuthenticatedRequest } from '../typings';

export const typeAuthenticatedUser = (req: CustomAuthenticatedRequest) => {
  if (req.user) {
    return req.user.valueOf() as AuthenticatedUserData;
  }
};

export const formatImageFile = (file: Express.Multer.File) => {
  const b64 = Buffer.from(file.buffer).toString('base64');
  return `data:${file.mimetype};base64,${b64}`;
};
